# Custom Ownable (CustomOwnable.sol)

View Source: [contracts/CustomOwnable.sol](../contracts/CustomOwnable.sol)

**↗ Extends: [Ownable](Ownable.md)**
**↘ Derived Contracts: [CustomAdmin](CustomAdmin.md)**

**CustomOwnable**

Custom ownable contract.

## Contract Members
**Constants & Variables**

```js
address private _trustee;

```

**Events**

```js
event TrusteeAssigned(address indexed account);
```

## Modifiers

- [onlyTrustee](#onlytrustee)

### onlyTrustee

Validates if the sender is actually the trustee.

```js
modifier onlyTrustee() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [assignTrustee(address account)](#assigntrustee)
- [reassignOwner(address newOwner)](#reassignowner)
- [getTrustee()](#gettrustee)

### assignTrustee

Assigns or changes the trustee wallet.

```js
function assignTrustee(address account) external nonpayable onlyOwner 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address | A wallet address which will become the new trustee. | 

### reassignOwner

Changes the owner of this contract.

```js
function reassignOwner(address newOwner) external nonpayable onlyTrustee 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newOwner | address | Specify a wallet address which will become the new owner. | 

### getTrustee

The trustee wallet has the power to change the owner in case of unforeseen or unavoidable situation.

```js
function getTrustee() external view
returns(address)
```

**Returns**

Wallet address of the trustee account.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

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
