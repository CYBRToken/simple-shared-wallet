# Bulk Transfer Contract (BulkTransfer.sol)

View Source: [contracts/BulkTransfer.sol](../contracts/BulkTransfer.sol)

**↗ Extends: [TransferBase](TransferBase.md)**
**↘ Derived Contracts: [SimpleWallet](SimpleWallet.md)**

**BulkTransfer**

The bulk transfer contract enables administrators to transfer an ERC20 token
 or Ethereum in batches. Every single feature of this contract is strictly restricted to be used by admin(s) only.

**Events**

```js
event BulkTransferPerformed(address indexed token, address indexed transferredBy, uint256  length, uint256  totalAmount);
event EtherBulkTransferPerformed(address indexed transferredBy, uint256  length, uint256  totalAmount);
```

## Functions

- [sumOf(uint256[] values)](#sumof)
- [bulkTransfer(address token, address[] destinations, uint256[] amounts)](#bulktransfer)
- [bulkTransferEther(address[] destinations, uint256[] amounts)](#bulktransferether)

### sumOf

Creates a sum total of the supplied values.

```js
function sumOf(uint256[] values) private pure
returns(uint256)
```

**Returns**

Returns the sum total of the supplied values.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| values | uint256[] | The collection of values to create the sum from. | 

### bulkTransfer

Allows the requester to perform ERC20 bulk transfer operation.

```js
function bulkTransfer(address token, address[] destinations, uint256[] amounts) external nonpayable onlyAdmin whenNotPaused 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | address | The ERC20 token to bulk transfer. | 
| destinations | address[] | The destination wallet addresses to send funds to. | 
| amounts | uint256[] | The respective amount of funds to send to the specified addresses. | 

### bulkTransferEther

Allows the requester to perform Ethereum bulk transfer operation.

```js
function bulkTransferEther(address[] destinations, uint256[] amounts) external nonpayable onlyAdmin whenNotPaused 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| destinations | address[] | The destination wallet addresses to send funds to. | 
| amounts | uint256[] | The respective amount of funds to send to the specified addresses. | 

## Contracts

* [Address](Address.md)
* [BulkTransfer](BulkTransfer.md)
* [CappedTransfer](CappedTransfer.md)
* [CustomAdmin](CustomAdmin.md)
* [CustomPausable](CustomPausable.md)
* [ERC20](ERC20.md)
* [IERC20](IERC20.md)
* [Migrations](Migrations.md)
* [Ownable](Ownable.md)
* [Reclaimable](Reclaimable.md)
* [SafeERC20](SafeERC20.md)
* [SafeMath](SafeMath.md)
* [SimpleToken](SimpleToken.md)
* [SimpleWallet](SimpleWallet.md)
* [TransferBase](TransferBase.md)
