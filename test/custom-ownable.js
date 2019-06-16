const Contract = artifacts.require("./CustomOwnable.sol");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Custom Ownable", function(accounts) {
  describe("Custom Ownable Ruleset", () => {
    let customOwnable;
    let owner = accounts[0];

    beforeEach(async () => {
      customOwnable = await Contract.new();
    });

    it("must allow the owner to assign trustee.", async () => {
      let customOwnable = await Contract.new();

      await customOwnable.assignTrustee(accounts[1]);
      assert.equal(await customOwnable.getTrustee(), accounts[1]);

      await customOwnable.assignTrustee(accounts[2]);
      assert.equal(await customOwnable.getTrustee(), accounts[2]);
    });

    it("must allow the trustee to set a new owner.", async () => {
      let customOwnable = await Contract.new();

      await customOwnable.assignTrustee(accounts[1]);
      assert.equal(await customOwnable.getTrustee(), accounts[1]);

      await customOwnable
        .reassignOwner(accounts[2])
        .should.be.rejectedWith(EVMRevert);

      await customOwnable.reassignOwner(accounts[2], { from: accounts[1] });
      assert.equal(await customOwnable.owner(), accounts[2]);
    });

    it("must not allow zero address to be assigned as a trustee.", async () => {
      const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
      await customOwnable
        .assignTrustee(ZERO_ADDRESS)
        .should.be.rejectedWith(EVMRevert);
    });
  });
});
