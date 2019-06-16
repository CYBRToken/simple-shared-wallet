# SimpleWallet.sol

View Source: [contracts/SimpleWallet.sol](../contracts/SimpleWallet.sol)

**↗ Extends: [BulkTransfer](BulkTransfer.md), [Reclaimable](Reclaimable.md)**

**SimpleWallet**

## Functions

- [tokenBalanceOf(address token)](#tokenbalanceof)
- [()](#)

### tokenBalanceOf

```js
function tokenBalanceOf(address token) external view
returns(uint256)
```

**Returns**

Returns balance of the ERC20 token held by this contract.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | address |  | 

### 

Accepts incoming funds

```js
function () external payable whenNotPaused 
```

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
