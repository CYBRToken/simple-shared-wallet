/*
Copyright 2018 Binod Nirvan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "./CappedTransfer.sol";

///@title Transfer Base Contract
///@author Binod Nirvan
///@notice The base contract which contains features related to token transfers.
contract TransferBase is CappedTransfer {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;

  event TransferPerformed(address indexed token, address indexed transferredBy, address indexed destination, uint256 amount);
  event EtherTransferPerformed(address indexed transferredBy, address indexed destination, uint256 amount);

  ///@notice Allows the sender to transfer tokens to the beneficiary.
  ///@param token The ERC20 token to transfer.
  ///@param destination The destination wallet address to send funds to.
  ///@param amount The amount of tokens to send to the specified address.
  ///@return Returns true if the operation was successful.
  function transferTokens(address token, address destination, uint256 amount)
  external onlyAdmin whenNotPaused
  returns(bool) {
    require(checkIfValidTransfer(amount), "Access is denied.");

    ERC20 erc20 = ERC20(token);

    require
    (
      erc20.balanceOf(address(this)) >= amount,
      "You don't have sufficient funds to transfer amount that large."
    );


    erc20.safeTransfer(destination, amount);


    emit TransferPerformed(token, msg.sender, destination, amount);
    return true;
  }

  ///@notice Allows the sender to transfer Ethers to the beneficiary.
  ///@param destination The destination wallet address to send funds to.
  ///@param amount The amount of Ether in wei to send to the specified address.
  ///@return Returns true if the operation was successful.
  function transferEthers(address payable destination, uint256 amount)
  external onlyAdmin whenNotPaused
  returns(bool) {
    require(checkIfValidWeiTransfer(amount), "Access is denied.");

    require
    (
      address(this).balance >= amount,
      "You don't have sufficient funds to transfer amount that large."
    );


    destination.transfer(amount);


    emit EtherTransferPerformed(msg.sender, destination, amount);
    return true;
  }

  ///@return Returns balance of the ERC20 token held by this contract.
  function tokenBalanceOf(address token) external view returns(uint256) {
    ERC20 erc20 = ERC20(token);
    return erc20.balanceOf(address(this));
  }

  ///@notice Accepts incoming funds
  function () external payable whenNotPaused {
    //nothing to do
  }

}