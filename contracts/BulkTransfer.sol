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

import "./CustomPausable.sol";
import "./TransferBase.sol";

///@title Bulk Transfer Contract
///@author Binod Nirvan
///@notice The bulk transfer contract enables administrators to transfer an ERC20 token
/// or Ethereum in batches. Every single feature of this contract is strictly restricted to be used by admin(s) only.
contract BulkTransfer is TransferBase {
  event BulkTransferPerformed(address indexed token, address indexed transferredBy, uint256 length, uint256 totalAmount);
  event EtherBulkTransferPerformed(address indexed transferredBy, uint256 length, uint256 totalAmount);

  ///@notice Creates a sum total of the supplied values.
  ///@param values The collection of values to create the sum from.
  ///@return Returns the sum total of the supplied values.
  function sumOf(uint256[] memory values) private pure returns(uint256) {
    uint256 total = 0;

    for (uint256 i = 0; i < values.length; i++) {
      total = total.add(values[i]);
    }

    return total;
  }


  ///@notice Allows the requester to perform ERC20 bulk transfer operation.
  ///@param token The ERC20 token to bulk transfer.
  ///@param destinations The destination wallet addresses to send funds to.
  ///@param amounts The respective amount of funds to send to the specified addresses.
  ///@return Returns true if the operation was successful.
  function bulkTransfer(address token, address[] calldata destinations, uint256[] calldata amounts)
  external onlyAdmin whenNotPaused
  returns(bool) {
    require(destinations.length == amounts.length, "Invalid operation.");

    //Saving gas by first determining if the sender actually has sufficient balance
    //to post this transaction.
    uint256 requiredBalance = sumOf(amounts);

    //Verifying whether or not this transaction exceeds the maximum allowed ERC20 transfer cap.
    require(checkIfValidTransfer(requiredBalance), "Access is denied.");

    ERC20 erc20 = ERC20(token);

    require
    (
      erc20.balanceOf(address(this)) >= requiredBalance,
      "You don't have sufficient funds to transfer amount this big."
    );


    for (uint256 i = 0; i < destinations.length; i++) {
      erc20.safeTransfer(destinations[i], amounts[i]);
    }

    emit BulkTransferPerformed(token, msg.sender, destinations.length, requiredBalance);
    return true;
  }


  ///@notice Allows the requester to perform Ethereum bulk transfer operation.
  ///@param destinations The destination wallet addresses to send funds to.
  ///@param amounts The respective amount of funds to send to the specified addresses.
  ///@return Returns true if the operation was successful.
  function bulkTransferEther(address[] calldata destinations, uint256[] calldata amounts)
  external onlyAdmin whenNotPaused
  returns(bool) {
    require(destinations.length == amounts.length, "Invalid operation.");

    //Saving gas by first determining if the sender actually has sufficient balance
    //to post this transaction.
    uint256 requiredBalance = sumOf(amounts);

    //Verifying whether or not this transaction exceeds the maximum allowed Ethereum transfer cap.
    require(checkIfValidWeiTransfer(requiredBalance), "Access is denied.");

    require
    (
      address(this).balance >= requiredBalance,
      "You don't have sufficient funds to transfer amount this big."
    );


    for (uint256 i = 0; i < destinations.length; i++) {
      address payable beneficiary = address(uint160(destinations[i]));
      beneficiary.transfer(amounts[i]);
    }


    emit EtherBulkTransferPerformed(msg.sender, destinations.length, requiredBalance);
    return true;
  }
}