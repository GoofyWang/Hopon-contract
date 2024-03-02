// SPDX-License-Identifier: MIT
// Copyright (C) 2024 [FelixFan]
// This contract is licensed under a Non-Commercial License.
// Commercial use is strictly prohibited.

pragma solidity ^0.7.0;

import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UniswapV2{

    IUniswapV2Router02 public immutable uniswapRouter;

    constructor(address _router){
        uniswapRouter = IUniswapV2Router02(_router);
    }

    function swapTokens(
        address tokenIn,
        address tokenOut,
        uint amountIn,
        uint slippage )
    external returns (uint amountOut){
        // Transfer the tokens to this contract
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);

        // Approve the router to spend the token.
        IERC20(tokenIn).approve(address(uniswapRouter), amountIn);

        // Get estimated amounts out
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;
        uint[] memory amountOutMins = uniswapRouter.getAmountsOut(amountIn, path);
        uint amountOutMin = amountOutMins[1] - ((amountOutMins[1] * slippage) / 10000);

        // Make the swap with a 3% slippage tolerance
        uint[] memory amounts = uniswapRouter.swapExactTokensForTokens(
            amountIn,
            amountOutMin, // The calculated minimum amount of tokenOut to receive
            path,
            msg.sender, // Recipient of the tokenOut
            block.timestamp + 300 // Deadline: current block timestamp plus some time
        );
        return amounts[1];
    }

}