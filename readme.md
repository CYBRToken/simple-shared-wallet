# Simple Shared Wallet

Simple shared wallet contract enables you to store ERC20 tokens and Ethereum funds which can be accessed and managed by not only you (the contract owner) but also several other admin wallets. This reduces your risk exposure as you are not relying on the owner wallet only as this could possibly be a single point of failure. This is not an alternative to or a replacement of multi-sig wallets.

**Other Use Cases**

This contract could also be useful for smart contract developers if you want to protect your client's funds by managing tokens and Ethereum in a smart contract which can also be accessed by other admin wallets when you are unavailable.

## Features

- Store ERC20 compatible token and Ethereum in the contract.
- Admins can transfer the tokens held in the contract to any wallet.
- The owner can define the maximum value limit of token or Ethereum transfer per transaction.
- Admins can perform bulk transfer to save gas.
- Admins can pause the contract in case of emergency.
- Admins can assign other admins to perform token or Ethereum transfers.
- The owner can assign a trustee wallet which will be able to change the owner in case of emergency.
- etc

## How to Install?

**Install Truffle Tools**

https://truffleframework.com

**Clone the Repository**

```git
git clone https://github.com/CYBRToken/simple-shared-wallet
```

**Install Packages**

```node
npm install
```

## Running Tests

**Start Local RPC Client**

```shell
ganache-cli
```

**Run Tests**

```shell
truffle test
```

**Run Coverage Tool**

```shell
npm run coverage
```

Open the file `./coverage/index.html` to view report.

**Generate Documentation**

```shell
rm -r ./build
truffle compile
solidoc
```

[Continue to Full Documentation](docs/SimpleWallet.md)

## You May Also Like

- [ERC20 Snapshot Generator](https://github.com/binodnp/erc20-snapshot)
- [Vyper ERC20 Contracts](https://github.com/binodnp/vyper-erc20)
- [Vyper Crowdsale Contracts](https://github.com/binodnp/vyper-crowdsale)
- [Solidoc: Solidity Documentation Generator](https://github.com/CYBRToken/solidoc)
- [SolFlattener: Solidity Flattener](https://github.com/CYBRToken/sol-flattener)
- [Vesting Schedule](https://github.com/binodnp/vesting-schedule)
