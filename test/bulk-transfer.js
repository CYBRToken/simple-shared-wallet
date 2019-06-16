const BigNumber = require("bignumber.js");
const Contract = artifacts.require("./BulkTransfer.sol");
const Token = artifacts.require("./SimpleToken.sol");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;
const ether = require("./helpers/ether").ether;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("Bulk Transfer", function(accounts) {
  const getTransferInfo = () => {
    const destinations = [];
    const balances = [];

    for (let i = 1; i < 6; i++) {
      destinations.push(accounts[i]);
      balances.push(i);
    }

    return { destinations, balances };
  };

  describe("Bulk transfer ruleset", () => {
    let contract;
    let contractAddress;
    let token;
    let tokenAddress;

    beforeEach(async () => {
      contract = await Contract.new();
      token = await Token.new();

      contractAddress = await contract.address;
      tokenAddress = await token.address;
      await token.transfer(contractAddress, ether(4000000));
    });

    it("must reject bulk transfer requests by non admins.", async () => {
      await contract
        .bulkTransfer(
          tokenAddress,
          getTransferInfo().destinations,
          getTransferInfo().balances.map(x => ether(x)),
          { from: accounts[2] }
        )
        .should.be.rejectedWith(EVMRevert);
    });

    it("must reject bulk Ether transfer requests by non admins.", async () => {
      await contract.setCap(ether(10000), ether(80));

      await web3.eth.sendTransaction({
        from: accounts[4],
        to: contractAddress,
        value: ether(20)
      });

      let balance = await web3.eth.getBalance(contractAddress);
      assert.equal(balance.toString(), ether(20).toString());

      await contract
        .bulkTransferEther(
          getTransferInfo().destinations,
          getTransferInfo().balances.map(x => ether(x)),
          {
            from: accounts[2]
          }
        )
        .should.be.rejectedWith(EVMRevert);
    });

    it("must reject bulk transfer exceeding allowed cap.", async () => {
      const cap = getTransferInfo().balances.reduce((a, c) => a + c);
      await contract.setCap(ether(cap - 1), ether(10));

      await contract
        .bulkTransfer(
          tokenAddress,
          getTransferInfo().destinations,
          getTransferInfo().balances.map(x => ether(x)),
          { from: accounts[2] }
        )
        .should.be.rejectedWith(EVMRevert);

      //Can't transfer by non admin
      await contract.setCap(ether(cap), ether(20));
      await contract
        .bulkTransfer(
          tokenAddress,
          getTransferInfo().destinations,
          getTransferInfo().balances.map(x => ether(x)),
          { from: accounts[2] }
        )
        .should.be.rejectedWith(EVMRevert);

      await contract.addAdmin(accounts[2]);

      await contract.bulkTransfer(
        tokenAddress,
        getTransferInfo().destinations,
        getTransferInfo().balances.map(x => ether(x)),
        { from: accounts[2] }
      );

      //Can't transfer when paused
      await contract.pause();
      await contract
        .bulkTransfer(
          tokenAddress,
          getTransferInfo().destinations,
          getTransferInfo().balances.map(x => ether(x)),
          { from: accounts[2] }
        )
        .should.be.rejectedWith(EVMRevert);
      await contract.unpause();

      //Can transfer when not paused

      await contract.bulkTransfer(
        tokenAddress,
        getTransferInfo().destinations,
        getTransferInfo().balances.map(x => ether(x)),
        { from: accounts[2] }
      );
    });

    it("must reject bulk Ether ether transfer exceeding allowed cap.", async () => {
      const cap = getTransferInfo().balances.reduce((a, c) => a + c);
      await contract.setCap(ether(1000), ether(cap - 1));

      await web3.eth.sendTransaction({
        from: accounts[4],
        to: contractAddress,
        value: ether(cap + 1)
      });

      await web3.eth.sendTransaction({
        from: accounts[5],
        to: contractAddress,
        value: ether(cap + 1)
      });

      let balance = await web3.eth.getBalance(contractAddress);
      assert.equal(balance.toString(), ether(2 * (cap + 1)).toString());

      await contract.addAdmin(accounts[2]);

      await contract
        .bulkTransferEther(
          getTransferInfo().destinations,
          getTransferInfo().balances.map(x => ether(x)),
          { from: accounts[2] }
        )
        .should.be.rejectedWith(EVMRevert);

      await contract.setCap(ether(1000), ether(cap));

      await contract.bulkTransferEther(
        getTransferInfo().destinations,
        getTransferInfo().balances.map(x => ether(x)),
        { from: accounts[2] }
      );

      //Can't transfer when paused
      contract.pause();
      await contract
        .bulkTransferEther(
          getTransferInfo().destinations,
          getTransferInfo().balances.map(x => ether(x)),
          { from: accounts[2] }
        )
        .should.be.rejectedWith(EVMRevert);
      contract.unpause();

      //Can transfer when not paused
      await contract.bulkTransferEther(
        getTransferInfo().destinations,
        getTransferInfo().balances.map(x => ether(x)),
        { from: accounts[2] }
      );
    });
  });
});
