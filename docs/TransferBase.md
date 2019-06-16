# Transfer Base Contract (TransferBase.sol)

View Source: [contracts/TransferBase.sol](../contracts/TransferBase.sol)

**↗ Extends: [CappedTransfer](CappedTransfer.md)**
**↘ Derived Contracts: [BulkTransfer](BulkTransfer.md)**

**TransferBase**

The base contract which contains features related to token transfers.

**Events**

```js
event TransferPerformed(address indexed token, address indexed transferredBy, address indexed destination, uint256  amount);
event EtherTransferPerformed(address indexed transferredBy, address indexed destination, uint256  amount);
```

## Functions

- [transferTokens(address token, address destination, uint256 amount)](#transfertokens)
- [transferEthers(address payable destination, uint256 amount)](#transferethers)
- [tokenBalanceOf(address token)](#tokenbalanceof)
- [()](#)

### transferTokens

Allows the sender to transfer tokens to the beneficiary.

```js
function transferTokens(address token, address destination, uint256 amount) external nonpayable onlyAdmin whenNotPaused 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | address | The ERC20 token to transfer. | 
| destination | address | The destination wallet address to send funds to. | 
| amount | uint256 | The amount of tokens to send to the specified address. | 

### transferEthers

Allows the sender to transfer Ethers to the beneficiary.

```js
function transferEthers(address payable destination, uint256 amount) external nonpayable onlyAdmin whenNotPaused 
returns(bool)
```

**Returns**

Returns true if the operation was successful.

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| destination | address payable | The destination wallet address to send funds to. | 
| amount | uint256 | The amount of Ether in wei to send to the specified address. | 

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
