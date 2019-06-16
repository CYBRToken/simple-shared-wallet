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

///@title Capped Transfer
///@author Binod Nirvan
///@notice The capped transfer contract outlines the rules on the maximum amount of ERC20 or Ether transfer for each transaction.
contract CappedTransfer is CustomPausable {
  event CapChanged(uint256 maximumTransfer, uint256 maximumTransferWei, uint256 oldMaximumTransfer, uint256 oldMaximumTransferWei);

  //Zero means unlimited transfer
  uint256 private _maximumTransfer = 0;
  uint256 private _maximumTransferWei = 0;

  ///@notice Ensures that the requested ERC20 transfer amount is within the maximum allowed limit.
  ///@param amount The amount being requested to be transferred out of this contract.
  ///@return Returns true if the transfer request is valid and acceptable.
  function checkIfValidTransfer(uint256 amount) internal view returns(bool) {
    require(amount > 0, "Access is denied.");

    if(_maximumTransfer > 0) {
      require(amount <= _maximumTransfer, "Sorry but the amount you're transferring is too much.");
    }

    return true;
  }

  ///@notice Ensures that the requested wei transfer amount is within the maximum allowed limit.
  ///@param amount The Ether wei unit amount being requested to be transferred out of this contract.
  ///@return Returns true if the transfer request is valid and acceptable.
  function checkIfValidWeiTransfer(uint256 amount) internal view returns(bool) {
    require(amount > 0, "Access is denied.");

    if(_maximumTransferWei > 0) {
      require(amount <= _maximumTransferWei, "Sorry but the amount you're transferring is too much.");
    }

    return true;
  }

  ///@notice Sets the maximum cap for a single ERC20 and Ether transfer.
  ///@return Returns true if the operation was successful.
  function setCap(uint256 cap, uint256 weiCap) external onlyOwner whenNotPaused returns(bool) {
    emit CapChanged(cap, weiCap, _maximumTransfer, _maximumTransferWei);

    _maximumTransfer = cap;
    _maximumTransferWei = weiCap;
    return true;
  }

  ///@notice Gets the transfer cap defined in this contract.
  ///@return Returns maximum allowed value for a single transfer operation of ERC20 token and Ethereum.
  function getCap() external view returns(uint256, uint256) {
    return (_maximumTransfer, _maximumTransferWei);
  }
}