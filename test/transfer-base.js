const BigNumber = require("bignumber.js");
const Contract = artifacts.require("./TransferBase.sol");
const Token = artifacts.require("./SimpleToken.sol");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;
const ether = require("./helpers/ether").ether;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("TransferBase", function(accounts) {
  describe("TransferBase Deposit Ruleset", () => {
    let contract;
    let contractAddress;
    let token;
    let tokenAddress;
    let owner = accounts[0];

    beforeEach(async () => {
      contract = await Contract.new();
      token = await Token.new();

      contractAddress = await contract.address;
      tokenAddress = await token.address;
    });

    it("must allow the contract to receive tokens.", async () => {
      const amount = ether(10000);

      await token.transfer(contractAddress, amount);
      let balanceOf = await token.balanceOf(contractAddress);
      let tokenBalanceOf = await contract.tokenBalanceOf(tokenAddress);

      assert.equal(balanceOf.toString(), amount.toString());
      assert.equal(tokenBalanceOf.toString(), amount.toString());

      await token.transfer(contractAddress, amount);
      balanceOf = await token.balanceOf(contractAddress);
      tokenBalanceOf = await contract.tokenBalanceOf(tokenAddress);

      assert.equal(balanceOf.toString(), ether(20000).toString());
      assert.equal(tokenBalanceOf.toString(), ether(20000).toString());
    });

    it("must allow the contract to receive Ether.", async () => {
      await contract.pause();

      await web3.eth
        .sendTransaction({
          from: accounts[0],
          to: contractAddress,
          value: ether(5)
        })
        .should.be.rejectedWith(EVMRevert);

      await contract.unpause();

      const tx = await web3.eth.sendTransaction({
        from: accounts[0],
        to: contractAddress,
        value: ether(1)
      });

      assert.equal(tx.status, true);

      await web3.eth.sendTransaction({
        from: accounts[0],
        to: contractAddress,
        value: ether(5)
      });

      let balance = await web3.eth.getBalance(contractAddress);
      assert.equal(balance.toString(), ether(6).toString());
    });
  });

  describe("TransferBase Withdrawal Ruleset", () => {
    let contract;
    let contractAddress;
    let token;
    let tokenAddress;

    beforeEach(async () => {
      contract = await Contract.new();
      token = await Token.new();

      contractAddress = await contract.address;
      tokenAddress = await token.address;
      await token.transfer(contractAddress, ether(40000));
    });

    it("must reject token withdrawals requests by non admins.", async () => {
      await contract.setCap(ether(10000), ether(20));

      await contract
        .transferTokens(tokenAddress, accounts[9], ether(100), {
          from: accounts[2]
        })
        .should.be.rejectedWith(EVMRevert);
    });

    it("must reject Ether withdrawals requests by non admins.", async () => {
      await contract.setCap(ether(10000), ether(20));

      await web3.eth.sendTransaction({
        from: accounts[4],
        to: contractAddress,
        value: ether(2)
      });

      let balance = await web3.eth.getBalance(contractAddress);
      assert.equal(balance.toString(), ether(2).toString());

      await contract
        .transferEthers(accounts[9], ether(1), { from: accounts[2] })
        .should.be.rejectedWith(EVMRevert);
    });

    it("must reject token withdrawals exceeding allowed cap.", async () => {
      await contract.setCap(ether(10000), ether(20));

      await contract
        .transferTokens(tokenAddress, accounts[9], ether(10001))
        .should.be.rejectedWith(EVMRevert);
    });

    it("must reject Ether withdrawals exceeding allowed cap.", async () => {
      await contract.setCap(ether(10000), ether(20));

      await web3.eth.sendTransaction({
        from: accounts[4],
        to: contractAddress,
        value: ether(20)
      });

      let balance = await web3.eth.getBalance(contractAddress);
      assert.equal(balance.toString(), ether(20).toString());

      await contract
        .transferEthers(accounts[9], ether(21))
        .should.be.rejectedWith(EVMRevert);
    });

    it("must allow token withdrawals requests by admins.", async () => {
      await contract.setCap(ether(10000), ether(20));
      await contract.addAdmin(accounts[2]);

      //Can't transfer more than cap
      await contract
        .transferTokens(tokenAddress, accounts[9], ether(10001), {
          from: accounts[2]
        })
        .should.be.rejectedWith(EVMRevert);

      //Can't transfer when paused
      await contract.pause();
      await contract
        .transferTokens(tokenAddress, accounts[9], ether(1), {
          from: accounts[2]
        })
        .should.be.rejectedWith(EVMRevert);

      await contract.unpause();

      await contract.transferTokens(tokenAddress, accounts[9], ether(100), {
        from: accounts[2]
      });

      let balanceOf = await token.balanceOf(accounts[9]);
      assert.equal(balanceOf.toString(), ether(100).toString());
    });

    it("must allow Ether withdrawals requests by admins.", async () => {
      await contract.setCap(ether(10000), ether(20));
      const randomAccount = web3.eth.accounts.create();

      await web3.eth.sendTransaction({
        from: accounts[7],
        to: contractAddress,
        value: ether(90)
      });

      let balance = await web3.eth.getBalance(contractAddress);
      assert.equal(balance.toString(), ether(90).toString());

      await contract.addAdmin(accounts[2]);

      //Can't transfer more than cap
      await contract
        .transferEthers(randomAccount.address, ether(21), {
          from: accounts[2]
        })
        .should.be.rejectedWith(EVMRevert);

      //Can't transfer when the contract is paused.
      await contract.pause();
      await contract
        .transferEthers(randomAccount.address, ether(1), {
          from: accounts[2]
        })
        .should.be.rejectedWith(EVMRevert);
      await contract.unpause();

      await contract.transferEthers(randomAccount.address, ether(1), {
        from: accounts[2]
      });

      balance = await web3.eth.getBalance(randomAccount.address);
      assert.equal(balance.toString(), ether(1).toString());
    });
  });
});
