// import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import React from "react";
// import HomeCss from '../css/Home.module.css';
import {ethers} from 'ethers';
import { useCallback, useMemo, useState, useEffect } from "react";

const Test = () => {

    const [contractAddress, setContractAddress] = React.useState('');
    const [bail, setBail] = React.useState(0);
    const [investment, setInvestment] = React.useState(0);
    const [swapAmount, setSwapAmount] = React.useState(0);
    const [returnInvestment, setReturnInvestment] = React.useState(0);
    const [swapWeth, setSwapWeth] = React.useState(0);
    const [burnToken, setBurnToken] = React.useState(0);
    const [increaseToken, setIncreaseToken] = React.useState(0);
    const [decreaseToken, setDecreaseToken] = React.useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [mintTokenAddress, setMintTokenAddress] = useState('');

    const hoponAbi = [{"type":"constructor","inputs":[{"name":"name","type":"string","internalType":"string"},{"name":"symbol","type":"string","internalType":"string"}],"stateMutability":"nonpayable"},{"type":"function","name":"addBaseToken","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToWhitelist","inputs":[{"name":"_address","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"allowance","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"approve","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"backDoorBurn","inputs":[{"name":"_tokenAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"backDoorWithdraw","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"baseTokenAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"canWithdraw","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"uint8"}],"stateMutability":"view"},{"type":"function","name":"decreaseBaseToken","inputs":[{"name":"_tokenAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"deposit","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"enableWithdraw","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"exitBalance","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"hoponAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"hoponCommission","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"hoponProfit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"hoponSwap","inputs":[{"name":"_amountIn","type":"uint256","internalType":"uint256"},{"name":"_tokenAddress","type":"address","internalType":"address"},{"name":"_targetTokenAddress","type":"address","internalType":"address"}],"outputs":[{"name":"amountOut","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"investorPool","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"isWhitelisted","inputs":[{"name":"_address","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"manageCommission","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"manageDeposit","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"manageInvestorPool","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"managePool","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"manageProfit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"manageWithdraw","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"manageWithdrawal","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"percentDecimal","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"swapContractAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"swapTokensToBaseToken","inputs":[{"name":"_tokenAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transfer","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"userPoolProfit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"withdrawBalance","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"spender","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC20InsufficientAllowance","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"allowance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InsufficientBalance","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"balance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSpender","inputs":[{"name":"spender","type":"address","internalType":"address"}]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]}];

    const tokenWeth = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';

    const tokenUni = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

    const tokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

    const mintAbi = [{"type":"constructor","inputs":[{"name":"name","type":"string","internalType":"string"},{"name":"symbol","type":"string","internalType":"string"}],"stateMutability":"nonpayable"},{"type":"function","name":"allowance","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"approve","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"uint8"}],"stateMutability":"view"},{"type":"function","name":"gift","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transfer","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"spender","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC20InsufficientAllowance","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"allowance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InsufficientBalance","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"balance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSpender","inputs":[{"name":"spender","type":"address","internalType":"address"}]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]}];

    const SwapRouterV2 = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";
    const UniswapV2RouterABI = [
        'function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts)'
    ];


    useEffect(() => {
        getCurrentPrice(tokenWeth,tokenUni);
        // const interval = setInterval(() => {
        //     getCurrentPrice();
        // }, 3000);
        // return () => clearInterval(interval);
    }, [getCurrentPrice]);

    async function getCurrentPrice(token0,token1) {
        const path = [token0, token1];
        //ETH在Uniswap路由器中自动处理为WETH
        const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Cu8m9iVEKhk8ZkJlLrXX2YTC32zohGNU');

        const routerContract = new ethers.Contract(SwapRouterV2, UniswapV2RouterABI, provider);
        const amountIn = ethers.parseEther("1");
        const amountsOut = await routerContract.getAmountsOut(amountIn, path);
        // console.log(amountsOut);
        const tmp = ethers.formatUnits(amountsOut[amountsOut.length - 1],'ether');
        setCurrentPrice(tmp);
    }



    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('connect');
            try {
                // 请求用户授权
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // 连接到钱包
                const provider = new ethers.BrowserProvider(window.ethereum);
                return provider.getSigner();
            } catch (error) {
                console.error("用户拒绝授权", error);
            }
        } else {
            console.log('未检测到以太坊钱包，请安装 MetaMask!');
        }
    }

    const swapWethFunc = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        const tokenContractAddress = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';
        const tokenContractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        const depositAmount = ethers.parseUnits(swapWeth.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        // 调用目标合约的 deposit 方法
        const depositResult = await tokenContract.deposit({ value: depositAmount });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        console.log('Deposit completed.' , depositResult ) ;
    }

    const chargeInvestApprove = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        let tokenContractAddress = tokenWeth;
        const tokenContractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // 执行合约地址
        const contracntB = contractAddress;

        const depositAmount = ethers.parseUnits(investment.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        const txApprove = await tokenContract.approve(contracntB, depositAmount);
        await txApprove.wait();

        alert('approve success')

        console.log('Deposit completed.' ) ;
    }

    const chargeInvest = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        let tokenContractAddress = tokenWeth;
        const tokenContractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // 执行合约地址
        const contracntB = contractAddress;

        const depositAmount = ethers.parseUnits(investment.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）


        // 合约ABI
        const contractAbiFragment = hoponAbi;

        // 使用合约地址和 ABI 创建合约对象，并绑定签名者
        const contracntBcon = new ethers.Contract(contracntB, contractAbiFragment, signer);

        // 调用方法
        const transaction = await contracntBcon.deposit(depositAmount, {
            gasLimit: 300000 // 设置 gasLimit
        });

        // 等待交易被挖矿确认
        await transaction.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }


    const manageChargeApprove = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        let tokenContractAddress = tokenWeth;
        const tokenContractAbi = hoponAbi;

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // 执行合约地址
        const contracntB = contractAddress;

        const depositAmount = ethers.parseUnits(bail.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        const txApprove = await tokenContract.approve(contracntB, depositAmount);
        await txApprove.wait();

        alert('approve success')

        console.log('approve completed.' ) ;
    }

    const manageCharge = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        let tokenContractAddress = tokenWeth;
        const tokenContractAbi = hoponAbi;

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // 执行合约地址
        const contracntB = contractAddress;

        const depositAmount = ethers.parseUnits(bail.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        // 合约ABI
        const contractAbiFragment = hoponAbi;

        // 使用合约地址和 ABI 创建合约对象，并绑定签名者
        const contracntBcon = new ethers.Contract(contracntB, contractAbiFragment, signer);

        // 调用方法
        const transaction = await contracntBcon.manageDeposit(depositAmount, {
            gasLimit: 300000 // 设置 gasLimit
        });

        // 等待交易被挖矿确认
        await transaction.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }

    const swapFunc = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        const tokenContractAddress = contractAddress;
        const tokenContractAbi = hoponAbi;

        const AcontractAddress = tokenWeth;

        const depositAmount = ethers.parseUnits(swapAmount.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        // 获取 ERC-20 代币合约实例
        const swapTokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // const approveData = await swapTokenContract.approve(AcontractAddress, depositAmount);
        // 调用目标合约的 deposit 方法
        const depositResult = await swapTokenContract.hoponSwap(
            depositAmount ,
            tokenWeth,
            tokenUni,
            { gasLimit: 300000 // 设置 gasLimit
        });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }

    const swapBackFunc = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        const tokenContractAddress = contractAddress;
        const tokenContractAbi = hoponAbi;

        const depositAmount = ethers.parseUnits(swapAmount.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        // 获取 ERC-20 代币合约实例
        const swapTokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // const approveData = await swapTokenContract.approve(AcontractAddress, depositAmount);
        // 调用目标合约的 deposit 方法
        const depositResult = await swapTokenContract.hoponSwap(
            depositAmount ,
            tokenUni,
            tokenWeth,
            { gasLimit: 300000 // 设置 gasLimit
            });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }

    const startWithdrawFunc = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        const tokenContractAddress = contractAddress;
        const tokenContractAbi = hoponAbi;

        const depositAmount = ethers.parseUnits(swapAmount.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        // 获取 ERC-20 代币合约实例
        const swapTokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // const approveData = await swapTokenContract.approve(AcontractAddress, depositAmount);
        // 调用目标合约的 deposit 方法
        // const depositResult = await swapTokenContract.enableWithdraw(
        //     { gasLimit: 900000 // 设置 gasLimit
        //     });

        const depositResult = await swapTokenContract.enableWithdraw(
            { gasLimit: 30000000 // 设置 gasLimit
            }
        );

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }

    const getHoponContract = async function (){

        let signer =  await connectWallet();

        // 合约地址和 ABI
        const tokenContractAddress = contractAddress;
        const tokenContractAbi = hoponAbi;

        // 获取 ERC-20 代币合约实例
        const swapTokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        return swapTokenContract;
    }


    const returnManageFunc = async() => {

        let hoponContract = await getHoponContract();


        // 调用目标合约的 deposit 方法
        const depositResult = await hoponContract.manageWithdraw(

            { gasLimit: 300000 // 设置 gasLimit
            });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }

    const returnInvestmentApproveFunc = async() => {

        let hoponContract = await getHoponContract();

        // 执行合约地址
        const contracntB = contractAddress;

        const depositAmount = ethers.parseUnits(returnInvestment.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        const txApprove = await hoponContract.approve(contracntB, depositAmount);
        await txApprove.wait();

        alert('approve success')

        console.log('approve completed.' ) ;
    }

    const returnInvestmentFunc = async() => {

        let hoponContract = await getHoponContract();
        const depositAmount = ethers.parseUnits(returnInvestment.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        // 调用目标合约的 deposit 方法
        const depositResult = await hoponContract.swapTokensToBaseToken(
            depositAmount,
            { gasLimit: 300000 // 设置 gasLimit
            });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }

    const backdoorFunc = async() => {

        let hoponContract = await getHoponContract();

        // 调用目标合约的 deposit 方法
        const depositResult = await hoponContract.backDoorWithdraw(
            { gasLimit: 300000 // 设置 gasLimit
            });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('success')

        console.log('Deposit completed.' ) ;
    }


    const burnTokenFunc = async() => {

        let hoponContract = await getHoponContract();

        // 调用目标合约的 deposit 方法
        const depositResult = await hoponContract.backDoorBurn(
            ethers.parseUnits(burnToken.toString(), 18),
            { gasLimit: 300000 // 设置 gasLimit
            });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('success')

        console.log('completed.' ) ;
    }

    const increaseTokenApproveFunc = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        let tokenContractAddress = tokenWeth;
        const tokenContractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // 执行合约地址
        const contracntB = contractAddress;

        const depositAmount = ethers.parseUnits(increaseToken.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        const txApprove = await tokenContract.approve(contracntB, depositAmount);
        await txApprove.wait();

        alert('increaseTokenApproveFunc success')

        console.log('increaseTokenFunc completed.' ) ;
    }


    const increaseTokenFunc = async() => {
        let signer =  await connectWallet();

        // 合约地址和 ABI
        let tokenContractAddress = tokenWeth;
        const tokenContractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

        // 执行合约地址
        const contracntB = contractAddress;

        const depositAmount = ethers.parseUnits(increaseToken.toString(), 18); // 1 ERC-20 代币（以 wei 为单位）

        // 合约ABI
        const contractAbiFragment = hoponAbi;

        // 使用合约地址和 ABI 创建合约对象，并绑定签名者
        const contracntBcon = new ethers.Contract(contracntB, contractAbiFragment, signer);

        // 调用方法
        const transaction = await contracntBcon.addBaseToken(depositAmount, {
            gasLimit: 300000 // 设置 gasLimit
        });

        // 等待交易被挖矿确认
        await transaction.wait();

        alert('increaseTokenFunc success')

        console.log('increaseTokenFunc completed.' ) ;
    }

    const decreaseTokenFunc = async() => {

        let hoponContract = await getHoponContract();

        // 调用目标合约的 deposit 方法
        const depositResult = await hoponContract.decreaseBaseToken(
            ethers.parseUnits(decreaseToken.toString(), 18),
            { gasLimit: 300000 // 设置 gasLimit
            });

        // 等待 deposit 交易被挖矿确认
        await depositResult.wait();

        alert('decreaseTokenFunc success')

        console.log('decreaseTokenFunc completed.' ) ;
    }


    const mintToken = async() => {
        let signer =  await connectWallet();

        // 获取 ERC-20 代币合约实例
        const tokenContract = new ethers.Contract(mintTokenAddress, mintAbi, signer);

        // 调用方法
        const transaction = await tokenContract.gift( {
            gasLimit: 300000 // 设置 gasLimit
        });

        // 等待交易被挖矿确认
        await transaction.wait();

        alert('success')

        console.log('mint token completed.' ) ;
    }


    const getAll = async() => {
        let hoponContract = await getHoponContract();

        hoponContract.methods.getAll().call()
            .then(result => {
                console.log('result:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (
        <>
            <div>

                <div>
                    1 WETH = {currentPrice} UNI
                </div>


                <div>
                    contractAddress : &nbsp;
                    <input
                        id="contractAddress"
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                    />
                </div>

                <div>
                    manage charge bail (自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="bail"
                        value={bail}
                        type={"number"}
                        onChange={(e) => setBail(parseFloat(e.target.value))}
                    />

                    <button
                        onClick={
                            e => {
                                e.preventDefault();
                                manageChargeApprove().then(()=>{

                                } );

                            }}
                    >approve</button>
                    <button
                        onClick={
                            e => {
                                e.preventDefault();
                                manageCharge().then(()=>{

                                } );

                            }}
                    >charge</button>
                </div>

                <div>
                    charge investment (自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="investment"
                        value={investment}
                        type={"number"}
                        onChange={(e) => setInvestment(parseFloat(e.target.value))}
                    />
                    <button
                    onClick={
                        e => {
                            e.preventDefault();
                            chargeInvestApprove().then(()=>{

                            } );

                        }}
                    >approve</button>
                    <button
                    onClick={
                        e => {
                            e.preventDefault();
                            chargeInvest().then(()=>{

                            } );

                        }}
                    >charge</button>
                </div>

                <div>
                    swap amount (自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="swapAmount"
                        value={swapAmount}
                        type={"number"}
                        onChange={(e) => setSwapAmount(parseFloat(e.target.value))}
                    />
                    <button
                        onClick={
                            e => {
                                e.preventDefault();
                                swapFunc().then(()=>{

                                } );

                            }}
                    > swap </button>
                    <button
                        onClick={
                            e => {
                                e.preventDefault();
                                swapBackFunc().then(()=>{

                                } );

                            }}
                    >  swapBack </button>
                </div>

                <button onClick={ (e) => startWithdrawFunc()} >
                    enable withdraw contract
                </button>


                <div>
                    retrun investment (先查看自己有多少余额，超过最大值approve必定失败 自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="returnInvestment"
                        type={"number"}
                        value={returnInvestment}
                        onChange={(e) => setReturnInvestment(parseFloat(e.target.value))}
                    />

                    <button
                        onClick={
                            e => {
                                e.preventDefault();
                                returnInvestmentApproveFunc().then(()=>{

                                } );

                            }}
                    >return investment approve</button>
                    <button
                        onClick={
                            e => {
                                e.preventDefault();
                                returnInvestmentFunc().then(()=>{

                                } );

                            }}
                    >return investment</button>
                </div>

                <div>
                    retrun manage : &nbsp;
                    <button
                        onClick={
                            e => {
                                e.preventDefault();
                                returnManageFunc().then(()=>{

                                } );

                            }}
                    >return</button>
                </div>


                <div>
                    swap weth (自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="swapWeth"
                        type={"number"}
                        value={swapWeth}
                        onChange={(e) => setSwapWeth(parseFloat(e.target.value))}
                    />
                    <button onClick={
                        e => {
                            e.preventDefault();
                            swapWethFunc().then(()=>{

                            } );

                        }}> swap </button>
                </div>


                <button onClick={
                    e => {
                        e.preventDefault();
                        backdoorFunc().then(()=>{

                        } );

                    }}> backdoor (合约重置，所有金额打到当前账户) </button>


                <div>
                    burn my token (自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="burnToken"
                        type={"number"}
                        value={burnToken}
                        onChange={(e) => setBurnToken(parseFloat(e.target.value))}
                    />
                    <button onClick={
                        e => {
                            e.preventDefault();
                            burnTokenFunc().then(()=>{

                            } );

                        }}> burn </button>
                </div>


                <div>
                    increase base token (模拟盈利 自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="increaseToken"
                        type={"number"}
                        value={increaseToken}
                        onChange={(e) => setIncreaseToken(parseFloat(e.target.value))}
                    />
                    <button onClick={
                        e => {
                            e.preventDefault();
                            increaseTokenApproveFunc().then(()=>{

                            } );

                        }}> approve </button>
                    <button onClick={
                        e => {
                            e.preventDefault();
                            increaseTokenFunc().then(()=>{

                            } );

                        }}> increase </button>
                </div>

                <div>
                    decrease base token (模拟亏损 自动在数量上 * 10^18) : &nbsp;
                    <input
                        id="decreaseToken"
                        type={"number"}
                        value={decreaseToken}
                        onChange={(e) => setDecreaseToken(parseFloat(e.target.value))}
                    />
                    <button onClick={
                        e => {
                            e.preventDefault();
                            decreaseTokenFunc().then(()=>{

                            } );

                        }}> decrease </button>
                </div>


                <div>
                    <input
                        id="mintTokenAddress"
                        value={mintTokenAddress}
                        onChange={(e) => setMintTokenAddress(e.target.value)}
                    />
                    <button onClick={
                        e => {
                            e.preventDefault();
                            mintToken().then(()=>{

                            } );

                        }}> decrease </button>

                </div>

                <div>
                    <button onClick={
                        e => {
                            e.preventDefault();
                            getAll().then(()=>{

                            } );

                        }}> decrease </button>

                </div>

                <div>
                    check contract : visit <a href={'https://sepolia.etherscan.io/address/' + contractAddress} target={'_blank'} >
                    https://sepolia.etherscan.io/address/{contractAddress}
                </a>
                </div>
            </div>
        </>
    );
};

export default Test;