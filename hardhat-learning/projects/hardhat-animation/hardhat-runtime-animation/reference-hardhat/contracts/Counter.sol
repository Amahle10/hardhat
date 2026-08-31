// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Counter {
    uint256 public count;

    function increment() public {
        count++;
    }

    function setCount(uint256 newCount) public {
        count = newCount;
    }
}
