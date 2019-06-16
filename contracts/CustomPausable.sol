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

import "./CustomAdmin.sol";

///@title Custom Pausable Contract
///@notice This contract provides pausable mechanism to stop in case of emergency.
/// The "pausable" features can be used and set by the contract administrators
/// and the owner.
contract CustomPausable is CustomAdmin {
  event Paused();
  event Unpaused();

  bool private _paused = false;

  ///@notice Ensures that the contract is not paused.
  modifier whenNotPaused() {
    require(!_paused, "Sorry but the contract is paused.");
    _;
  }

  ///@notice Ensures that the contract is paused.
  modifier whenPaused() {
    require(_paused, "Sorry but the contract isn't paused.");
    _;
  }

  ///@notice Pauses the contract.
  function pause() external onlyAdmin whenNotPaused {
    _paused = true;
    emit Paused();
  }

  ///@notice Unpauses the contract and returns to normal state.
  function unpause() external onlyAdmin whenPaused {
    _paused = false;
    emit Unpaused();
  }

  ///@notice Indicates if the contract is paused.
  ///@return Returns true if this contract is paused.
  function isPaused() external view returns(bool) {
    return _paused;
  }
}