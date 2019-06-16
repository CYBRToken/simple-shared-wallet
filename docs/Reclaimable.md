# Reclaimable Contract (Reclaimable.sol)

View Source: [contracts/Reclaimable.sol](../contracts/Reclaimable.sol)

**↗ Extends: [CustomPausable](CustomPausable.md)**
**↘ Derived Contracts: [SimpleWallet](SimpleWallet.md)**

**Reclaimable**

Reclaimable contract enables the owner
to reclaim accidentally sent Ethers and ERC20 token(s)
to this contract.

## Functions

- [reclaimEther()](#reclaimether)
- [reclaimToken(address token)](#reclaimtoken)

### reclaimEther

Transfers all Ether held by the contract to the caller.

```js
function reclaimEther() external nonpayable whenNotPaused onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### reclaimToken

Transfers all ERC20 tokens held by the contract to the caller.

```js
function reclaimToken(address token) external nonpayable whenNotPaused onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | address | The amount of token to reclaim. | 

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
