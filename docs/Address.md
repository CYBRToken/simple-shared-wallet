# Address.sol

View Source: [openzeppelin-solidity/contracts/utils/Address.sol](../openzeppelin-solidity/contracts/utils/Address.sol)

**Address**

Collection of functions related to the address type,

## Functions

- [isContract(address account)](#iscontract)

### isContract

Returns true if `account` is a contract.
     * This test is non-exhaustive, and there may be false-negatives: during the
execution of a contract's constructor, its address will be reported as
not containing a contract.
     * > It is unsafe to assume that an address for which this function returns
false is an externally-owned account (EOA) and not a contract.

```js
function isContract(address account) internal view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

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
