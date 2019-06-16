# Custom Admin (CustomAdmin.sol)

View Source: [contracts/CustomAdmin.sol](../contracts/CustomAdmin.sol)

**↗ Extends: [CustomOwnable](CustomOwnable.md)**
**↘ Derived Contracts: [CustomPausable](CustomPausable.md)**

**CustomAdmin**

Custom admin contract provides features to have multiple administrators
 who can collective perform admin-related tasks instead of depending on the owner.
 &nbsp;
 It is assumed by default that the owner is more power than admins
 and therefore cannot be added to or removed from the admin list.

## Contract Members
**Constants & Variables**

```js
mapping(address => bool) private _admins;

```

**Events**

```js
event AdminAdded(address indexed account);
event AdminRemoved(address indexed account);
event TrusteeAssigned(address indexed account);
```

## Modifiers

- [onlyAdmin](#onlyadmin)

### onlyAdmin

Validates if the sender is actually an administrator.

```js
modifier onlyAdmin() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [addAdmin(address account)](#addadmin)
- [addManyAdmins(address[] accounts)](#addmanyadmins)
- [removeAdmin(address account)](#removeadmin)
- [removeManyAdmins(address[] accounts)](#removemanyadmins)
- [isAdmin(address account)](#isadmin)

### addAdmin

Adds the specified address to the list of administrators.

```js
function addAdmin(address account) external nonpayable onlyAdmin 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address | The address to add to the administrator list. | 

### addManyAdmins

Adds multiple addresses to the administrator list.

```js
function addManyAdmins(address[] accounts) external nonpayable onlyAdmin 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| accounts | address[] | The account addresses to add to the administrator list. | 

### removeAdmin

Removes the specified address from the list of administrators.

```js
function removeAdmin(address account) external nonpayable onlyAdmin 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address | The address to remove from the administrator list. | 

### removeManyAdmins

Removes multiple addresses to the administrator list.

```js
function removeManyAdmins(address[] accounts) external nonpayable onlyAdmin 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| accounts | address[] | The account addresses to add to the administrator list. | 

### isAdmin

Checks if an address is an administrator.

```js
function isAdmin(address account) public view
returns(bool)
```

**Returns**

Returns true if the specified wallet is infact an administrator.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

## Contracts

* [Address](Address.md)
* [BulkTransfer](BulkTransfer.md)
* [CappedTransfer](CappedTransfer.md)
* [CustomAdmin](CustomAdmin.md)
* [CustomOwnable](CustomOwnable.md)
* [CustomPausable](CustomPausable.md)
* [ERC20](ERC20.md)
* [ForceEther](ForceEther.md)
* [IERC20](IERC20.md)
* [Migrations](Migrations.md)
* [Ownable](Ownable.md)
* [Reclaimable](Reclaimable.md)
* [SafeERC20](SafeERC20.md)
* [SafeMath](SafeMath.md)
* [SimpleToken](SimpleToken.md)
* [SimpleWallet](SimpleWallet.md)
* [TransferBase](TransferBase.md)
