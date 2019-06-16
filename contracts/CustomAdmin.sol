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
import "./CustomOwnable.sol";

///@title Custom Admin
///@notice Custom admin contract provides features to have multiple administrators
/// who can collective perform admin-related tasks instead of depending on the owner.
/// &nbsp;
/// It is assumed by default that the owner is more power than admins
/// and therefore cannot be added to or removed from the admin list.
contract CustomAdmin is CustomOwnable {
  ///List of administrators.
  mapping(address => bool) private _admins;

  event AdminAdded(address indexed account);
  event AdminRemoved(address indexed account);

  event TrusteeAssigned(address indexed account);

  ///@notice Validates if the sender is actually an administrator.
  modifier onlyAdmin() {
    require(isAdmin(msg.sender), "Access is denied.");
    _;
  }

  ///@notice Adds the specified address to the list of administrators.
  ///@param account The address to add to the administrator list.
  ///@return Returns true if the operation was successful.
  function addAdmin(address account) external onlyAdmin returns(bool) {
    require(account != address(0), "Invalid address.");
    require(!_admins[account], "This address is already an administrator.");

    require(account != super.owner(), "The owner cannot be added or removed to or from the administrator list.");

    _admins[account] = true;

    emit AdminAdded(account);
    return true;
  }

  ///@notice Adds multiple addresses to the administrator list.
  ///@param accounts The account addresses to add to the administrator list.
  ///@return Returns true if the operation was successful.
  function addManyAdmins(address[] calldata accounts) external onlyAdmin returns(bool) {
    for(uint8 i = 0; i < accounts.length; i++) {
      address account = accounts[i];

      ///Zero address cannot be an admin.
      ///The owner is already an admin and cannot be assigned.
      ///The address cannot be an existing admin.
      if(account != address(0) && !_admins[account] && account != super.owner()) {
        _admins[account] = true;

        emit AdminAdded(accounts[i]);
      }
    }

    return true;
  }

  ///@notice Removes the specified address from the list of administrators.
  ///@param account The address to remove from the administrator list.
  ///@return Returns true if the operation was successful.
  function removeAdmin(address account) external onlyAdmin returns(bool) {
    require(account != address(0), "Invalid address.");
    require(_admins[account], "This address isn't an administrator.");

    //The owner cannot be removed as admin.
    require(account != super.owner(), "The owner cannot be added or removed to or from the administrator list.");

    _admins[account] = false;
    emit AdminRemoved(account);
    return true;
  }

  ///@notice Removes multiple addresses to the administrator list.
  ///@param accounts The account addresses to add to the administrator list.
  ///@return Returns true if the operation was successful.
  function removeManyAdmins(address[] calldata accounts) external onlyAdmin returns(bool) {
    for(uint8 i = 0; i < accounts.length; i++) {
      address account = accounts[i];

      ///Zero address can neither be added or removed from this list.
      ///The owner is the super admin and cannot be removed.
      ///The address must be an existing admin in order for it to be removed.
      if(account != address(0) && _admins[account] && account != super.owner()) {
        _admins[account] = false;

        emit AdminRemoved(accounts[i]);
      }
    }

    return true;
  }

  ///@notice Checks if an address is an administrator.
  ///@return Returns true if the specified wallet is infact an administrator.
  function isAdmin(address account) public view returns(bool) {
    if(account == super.owner()) {
      //The owner has all rights and privileges assigned to the admins.
      return true;
    }

    return _admins[account];
  }
}