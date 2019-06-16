# Capped Transfer (CappedTransfer.sol)

View Source: [contracts/CappedTransfer.sol](../contracts/CappedTransfer.sol)

**↗ Extends: [CustomPausable](CustomPausable.md)**
**↘ Derived Contracts: [TransferBase](TransferBase.md)**

**CappedTransfer**

The capped transfer contract outlines the rules on the maximum amount of ERC20 or Ether transfer for each transaction.

## Contract Members
**Constants & Variables**

```js
uint256 private _maximumTransfer;
uint256 private _maximumTransferWei;

```

**Events**

```js
event CapChanged(uint256  maximumTransfer, uint256  maximumTransferWei, uint256  oldMaximumTransfer, uint256  oldMaximumTransferWei);
```

## Functions

- [checkIfValidTransfer(uint256 amount)](#checkifvalidtransfer)
- [checkIfValidWeiTransfer(uint256 amount)](#checkifvalidweitransfer)
- [setCap(uint256 cap, uint256 weiCap)](#setcap)
- [getCap()](#getcap)

### checkIfValidTransfer

Ensures that the requested ERC20 transfer amount is within the maximum allowed limit.

```js
function checkIfValidTransfer(uint256 amount) internal view
returns(bool)
```

**Returns**

Returns true if the transfer request is valid and acceptable.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| amount | uint256 | The amount being requested to be transferred out of this contract. | 

### checkIfValidWeiTransfer

Ensures that the requested wei transfer amount is within the maximum allowed limit.

```js
function checkIfValidWeiTransfer(uint256 amount) internal view
returns(bool)
```

**Returns**

Returns true if the transfer request is valid and acceptable.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| amount | uint256 | The Ether wei unit amount being requested to be transferred out of this contract. | 

### setCap

Sets the maximum cap for a single ERC20 and Ether transfer.

```js
function setCap(uint256 cap, uint256 weiCap) external nonpayable onlyOwner whenNotPaused 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| cap | uint256 |  | 
| weiCap | uint256 |  | 

### getCap

Gets the transfer cap defined in this contract.

```js
function getCap() external view
returns(uint256, uint256)
```

**Returns**

Returns maximum allowed value for a single transfer operation of ERC20 token and Ethereum.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

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
