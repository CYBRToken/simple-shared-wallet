# Custom Pausable Contract (CustomPausable.sol)

View Source: [contracts/CustomPausable.sol](../contracts/CustomPausable.sol)

**↗ Extends: [CustomAdmin](CustomAdmin.md)**
**↘ Derived Contracts: [CappedTransfer](CappedTransfer.md), [Reclaimable](Reclaimable.md)**

**CustomPausable**

This contract provides pausable mechanism to stop in case of emergency.
 The "pausable" features can be used and set by the contract administrators
 and the owner.

## Contract Members
**Constants & Variables**

```js
bool private _paused;

```

**Events**

```js
event Paused();
event Unpaused();
```

## Modifiers

- [whenNotPaused](#whennotpaused)
- [whenPaused](#whenpaused)

### whenNotPaused

Ensures that the contract is not paused.

```js
modifier whenNotPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenPaused

Ensures that the contract is paused.

```js
modifier whenPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [pause()](#pause)
- [unpause()](#unpause)
- [isPaused()](#ispaused)

### pause

Pauses the contract.

```js
function pause() external nonpayable onlyAdmin whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### unpause

Unpauses the contract and returns to normal state.

```js
function unpause() external nonpayable onlyAdmin whenPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isPaused

Indicates if the contract is paused.

```js
function isPaused() external view
returns(bool)
```

**Returns**

Returns true if this contract is paused.

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
