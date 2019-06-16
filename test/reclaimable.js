const SimpleWallet = artifacts.require("./SimpleWallet.sol");
const ForceEther = artifacts.require("./ForceEther.sol");
const ERC20 = artifacts.require("./SimpleToken.sol");
const BigNumber = require("bignumber.js");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;
const ether = require("./helpers/ether").ether;
const getBalance = require("./helpers/web3").ethGetBalance;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("TokenBase:Reclaim", function(accounts) {
  describe("Reclaim Ruleset", () => {
    it("must allow the owner to recover accidentally sent ERC20 tokens.", async () => {
      let contract = await SimpleWallet.new();
      let erc20 = await ERC20.new();
      let contractAddress = await contract.address;
      let erc20Address = await erc20.address;

      await erc20.transfer(contractAddress, ether(1000), { from: accounts[0] });

      //Cannot reclaim when the contract is paused
      await contract.pause();

      await contract
        .reclaimToken(erc20Address, {
          from: accounts[0]
        })
        .should.be.rejectedWith(EVMRevert);

      await contract.unpause();

      await contract
        .reclaimToken(erc20Address, {
          from: accounts[1]
        })
        .should.be.rejectedWith(EVMRevert);

      await contract.transferOwnership(accounts[1]);

      await contract.reclaimToken(erc20Address, {
        from: accounts[1]
      });

      const balanceOf = await erc20.balanceOf(accounts[1]);
      assert.equal(balanceOf.toString(), ether(1000).toString());
    });

    it("must allow the owner to reclaim Ethers", async function() {
      let contract = await SimpleWallet.new();
      let contractAddress = await contract.address;

      const amount = web3.utils.toWei("1", "ether");
      const balance = await getBalance(contractAddress);
      assert.equal(balance, 0);

      // Force ether
      const forceEther = await ForceEther.new({
        value: amount
      });

      await forceEther.destroyAndSend(contractAddress);
      const forcedBalance = await getBalance(contractAddress);
      assert.equal(forcedBalance, amount);

      // Reclaim
      const openingBalance = await getBalance(accounts[1]);

      //Cannot reclaim when paused
      await contract.pause();

      await contract
        .reclaimEther({
          from: accounts[1]
        })
        .should.be.rejectedWith(EVMRevert);

      await contract.unpause();

      //Cannot reclaim if not owner
      await contract
        .reclaimEther({
          from: accounts[1]
        })
        .should.be.rejectedWith(EVMRevert);

      await contract.transferOwnership(accounts[1]);

      await contract.reclaimEther({
        from: accounts[1]
      });

      const closingBalance = await getBalance(accounts[1]);
      const tokenClosingBalance = await getBalance(contractAddress);
      assert.equal(tokenClosingBalance, 0);
      assert.isTrue(BigNumber(closingBalance).isGreaterThan(openingBalance));
    });
  });
});
