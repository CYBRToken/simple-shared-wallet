const BigNumber = require("bignumber.js");
const Contract = artifacts.require("./CappedTransfer.sol");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("Custom Ownable", function(accounts) {
  describe("Custom Ownable Ruleset", () => {
    let cappedTransfer;
    let owner = accounts[0];

    beforeEach(async () => {
      cappedTransfer = await Contract.new();
    });

    it("must set initial cap to zero values.", async () => {
      const result = await cappedTransfer.getCap();

      assert.equal(new BigNumber(result["0"]).toNumber(), 0);
      assert.equal(new BigNumber(result["1"]).toNumber(), 0);
    });

    it("must not allow setting the transfer cap when paused.", async () => {
      await cappedTransfer.pause();

      await cappedTransfer
        .setCap(10000, 20000)
        .should.be.rejectedWith(EVMRevert);
    });

    it("must correctly set the transfer cap.", async () => {
      await cappedTransfer.setCap(10000, 20000);
      const result = await cappedTransfer.getCap();

      assert.equal(new BigNumber(result["0"]).toNumber(), 10000);
      assert.equal(new BigNumber(result["1"]).toNumber(), 20000);
    });

    it("must correctly check if the token transfer is within cap.", async () => {
      await cappedTransfer.setCap(10000, 20000);
      const cap = await cappedTransfer.getCap();

      assert.equal(new BigNumber(cap["0"]).toNumber(), 10000);
      assert.equal(new BigNumber(cap["1"]).toNumber(), 20000);

      await cappedTransfer
        .checkIfValidTransfer(10001)
        .should.be.rejectedWith(EVMRevert);

      let result = await cappedTransfer.checkIfValidTransfer(10000);
      assert.equal(result, true);

      result = await cappedTransfer.checkIfValidTransfer(1000);
      assert.equal(result, true);
    });

    it("must correctly check if the wei transfer is within cap.", async () => {
      await cappedTransfer.setCap(10000, 20000);
      const cap = await cappedTransfer.getCap();

      assert.equal(new BigNumber(cap["0"]).toNumber(), 10000);
      assert.equal(new BigNumber(cap["1"]).toNumber(), 20000);

      await cappedTransfer
        .checkIfValidWeiTransfer(20001)
        .should.be.rejectedWith(EVMRevert);

      let result = await cappedTransfer.checkIfValidWeiTransfer(20000);
      assert.equal(result, true);

      result = await cappedTransfer.checkIfValidWeiTransfer(10000);
      assert.equal(result, true);
    });
  });
});
