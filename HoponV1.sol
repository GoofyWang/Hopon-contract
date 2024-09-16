// SPDX-License-Identifier: MIT
// Copyright (C) 2024 [Wangbingxuan]
// This contract is licensed under a Non-Commercial License.
// Commercial use is strictly prohibited.

pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

interface ISwapContract {
    function swapTokens(
        address tokenIn,  
        address tokenOut, 
        uint amountIn, 
        uint slippage )
    external returns (uint amountOut);
}

contract HoponV1 is ERC20, ReentrancyGuard {

    // Base token address
    address public immutable baseTokenAddress;
    // Hopon profit share address
    address public immutable hoponAddress;
    // Swap contract address
    address public immutable swapContractAddress;
    // Contract owner address
    address public immutable owner;
    
    // Manager's pool
    uint256 public managerPool;
    // Investor's pool
    uint256 public investorPool;
    // Total pool balance at the time of exit
    uint256 public exitBalance;
    // User's profit + principal at the time of exit
    uint256 public userPoolProfit;
    // Manager's investment share profit + principal at the time of exit
    uint256 public managerInvestorPool;
    // Remaining total pool after deducting manager and Hopon fees at the time of exit
    uint256 public withdrawBalance;

    // Percentage calculation precision
    uint256 public percentDecimal = 1000000;
    // Flag to check if withdrawal is allowed
    bool public canWithdraw;
    // Flag to check if manager has withdrawn
    bool public managerWithdrawal;
  
    // Manager's commission percentage
    uint256 public managerCommission;
    // Hopon's commission percentage
    uint256 public hoponCommission;

    // Manager's profit
    uint256 public managerProfit;
    // Hopon's profit
    uint256 public hoponProfit;

    // Mapping to quickly check if an address is in the whitelist
    mapping(address => bool) private whitelist;

    // Whitelist addresses
    address[] private whitelistAddresses;

    // Define the token's name and symbol
    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
    {   
        // Store the contract creator (deployer) address in the owner state variable
        owner = msg.sender;
    
        withdrawBalance = 0;
  
        canWithdraw = false;
        managerWithdrawal = false;

        hoponAddress = 0xb90C1ecEe9B1D233583cF71C7E99DCBdA08ad312;
      
        baseTokenAddress = 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14;

        hoponCommission = 10;
        managerCommission = 10;

        managerProfit = 0;
        hoponProfit = 0;

        managerInvestorPool = 0;

        whitelist[0x5FbDB2315678afecb367f032d93F642f64180aa3] = true;
        whitelist[0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14] = true;
        whitelist[0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984] = true;
        whitelistAddresses = [0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14, 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984, 0x5FbDB2315678afecb367f032d93F642f64180aa3];

        swapContractAddress = 0x130601311F29feb31d369a917B23Af58FE5ef23D;
    }

    // Modifier to ensure only the owner can execute
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Modifier to ensure only Hopon can execute
    modifier onlyHopon() {
        require(msg.sender == hoponAddress, "Not the hopon");
        _;
    }

    // Add an address to the whitelist
    function addToWhitelist(address _address) external {
        require(!whitelist[_address], "Address is already in whitelist");
        whitelist[_address] = true;
        whitelistAddresses.push(_address);
    }

    // Check if an address is in the whitelist
    function isWhitelisted(address _address) public view returns (bool) {
        return whitelist[_address];
    }

    // Enable withdrawal
    function enableWithdraw() public {
        canWithdraw = true;

        for (uint8 i = 0; i < whitelistAddresses.length; i++) {
            address tokenAddress = whitelistAddresses[i];
            if (tokenAddress != baseTokenAddress) {
                uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
                if(balance > 0){
                    hoponSwap(balance, tokenAddress, baseTokenAddress);
                }
            }
        }

        exitBalance = IERC20(baseTokenAddress).balanceOf(address(this));

        // Get the total supply of tokens
        uint256 totalSupply = managerPool + investorPool;
        require(totalSupply > 0, "Total supply cannot be zero");

        // Profit
        if(exitBalance > totalSupply){
            uint256 tempProfit =  exitBalance - totalSupply;
            // Manager's operational profit
            managerProfit = tempProfit * managerCommission * (100 - hoponCommission) / (100 * 100);
            // Hopon's profit
            hoponProfit = tempProfit * managerCommission * hoponCommission / (100 * 100);
            // Remaining balance after deductions
            withdrawBalance = exitBalance - managerProfit - hoponProfit;
            
            managerInvestorPool = managerPool;

            if(hoponProfit > 0){
                  require(IERC20(baseTokenAddress).transfer(hoponAddress, hoponProfit), "Failed to send base token to user");
            }

        } else { // Loss or break-even
            // Manager's bail is enough to cover all compensation
            if( (totalSupply - exitBalance) <= managerPool){
                // Remaining balance after compensation automatically converted to investment
                managerInvestorPool = managerPool - totalSupply - exitBalance;
            } 
            withdrawBalance = exitBalance;
        }

    }

    // Manager deposit
    function manageDeposit(uint256 _amount) external nonReentrant {
        uint256 preBalance = IERC20(baseTokenAddress).balanceOf(address(this));
        require(IERC20(baseTokenAddress).transferFrom(msg.sender, address(this), _amount), "Deposit failed");
        uint256 postBalance = IERC20(baseTokenAddress).balanceOf(address(this));
        require(postBalance - preBalance == _amount, "Incorrect amount received");
        managerPool += _amount;
    }   

    // Investor deposit
    function deposit(uint256 _amount) external nonReentrant {
        uint256 preBalance = IERC20(baseTokenAddress).balanceOf(address(this));
        require(IERC20(baseTokenAddress).transferFrom{gas: 300000}(msg.sender, address(this), _amount), "Deposit failed");
        uint256 postBalance = IERC20(baseTokenAddress).balanceOf(address(this));
        require(postBalance - preBalance == _amount, "Incorrect amount received");
        investorPool += _amount;
        _mint(msg.sender, _amount);
    }   
    
    // User withdrawal
    function swapTokensToBaseToken(uint256 _tokenAmount) external nonReentrant {
        require(canWithdraw , "Withdrawal is not allowed yet");
        uint256 contractBaseBalance = IERC20(baseTokenAddress).balanceOf(address(this));
        uint256 baseTokenToTransfer = _tokenAmount * withdrawBalance / (investorPool + managerInvestorPool);
        require(baseTokenToTransfer > 0 && baseTokenToTransfer <= contractBaseBalance, "Not enough baseToken in contract for the swap");
        bool sentToken = this.transferFrom(msg.sender, address(this), _tokenAmount);
        require(sentToken, "Token transfer failed");
        _burn(msg.sender, _tokenAmount);
        require(IERC20(baseTokenAddress).transfer(msg.sender, baseTokenToTransfer), "Failed to send base token to user");
    }

    // Manager withdrawal
    function manageWithdraw() external nonReentrant {
        require(!managerWithdrawal , 'already withdraw');
        require(canWithdraw , "Withdrawal is not allowed yet");
        managerWithdrawal = true;
        if( (managerProfit + managerInvestorPool)  > 0){
            uint256 baseTokenToTransfer = managerProfit;
            if(managerInvestorPool > 0){
                baseTokenToTransfer += managerInvestorPool * withdrawBalance / (investorPool + managerInvestorPool);
            }
            require(IERC20(baseTokenAddress).transfer(msg.sender, baseTokenToTransfer), "Failed to send base token to user");
        }
    }

    // Swap tokens to base token
    function hoponSwap(uint _amountIn, address _tokenAddress, address _targetTokenAddress) public returns (uint amountOut){
        require(_amountIn > 0, 'Illegal amount');
        IERC20 tokenApproveContract = IERC20(_tokenAddress);
        tokenApproveContract.approve(swapContractAddress, _amountIn);
        ISwapContract swapContract = ISwapContract(swapContractAddress);
        uint _amountOut = swapContract.swapTokens{gas: 300000}(
            _tokenAddress,
            _targetTokenAddress,
            _amountIn,
            300
        );
        return _amountOut;
    }
}
