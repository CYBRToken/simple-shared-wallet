const Contract = artifacts.require("./CustomPausable.sol");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Custom Pausable", function(accounts) {
  describe("Custom Pausable Ruleset", () => {
    let pausable;
    let admins = [accounts[1], accounts[5], accounts[9]];

    beforeEach(async () => {
      pausable = await Contract.new();
      await pausable.addManyAdmins(admins);
    });

    it("must initially start unpaused", async () => {
      assert.equal(await pausable.isPaused(), false);
    });

    it("must only be paused by an administrator.", async () => {
      await pausable
        .pause({
          from: accounts[2]
        })
        .should.be.rejectedWith(EVMRevert);

      await pausable.addAdmin(accounts[2]);
      await pausable.pause({
        from: accounts[2]
      });

      assert.equal(await pausable.isPaused(), true);
    });

    it("must only be unpaused by an administrator.", async () => {
      await pausable
        .pause({
          from: accounts[8]
        })
        .should.be.rejectedWith(EVMRevert);

      await pausable.addAdmin(accounts[8]);
      await pausable.pause({
        from: accounts[8]
      });
      assert.equal(await pausable.isPaused(), true);

      await pausable.removeAdmin(accounts[8]);
      await pausable
        .unpause({
          from: accounts[8]
        })
        .should.be.rejectedWith(EVMRevert);
      assert.equal(await pausable.isPaused(), true);

      await pausable.unpause({
        from: admins[1]
      });
      assert.equal(await pausable.isPaused(), false);
    });
  });
});
