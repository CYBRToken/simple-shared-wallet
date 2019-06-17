const Contract = artifacts.require("./CustomAdmin.sol");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Custom Admin", function(accounts) {
  describe("Custom Admin Ruleset", () => {
    let customAdmin;
    let owner = accounts[0];

    beforeEach(async () => {
      customAdmin = await Contract.new();
    });

    it("must treat the owner as an administrator", async () => {
      assert.equal(await customAdmin.owner(), owner);
      assert.equal(await customAdmin.isAdmin(accounts[0]), true);
    });

    it("must not allow zero address to be added as an admin.", async () => {
      const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
      await customAdmin
        .addAdmin(ZERO_ADDRESS)
        .should.be.rejectedWith(EVMRevert);
    });

    it("must not allow the owner to be added to the administrator list.", async () => {
      await customAdmin.addAdmin(owner).should.be.rejectedWith(EVMRevert);
    });

    it("must not allow the owner to be removed from the administrator list.", async () => {
      await customAdmin.removeAdmin(owner).should.be.rejectedWith(EVMRevert);
    });

    it("must allow an administrator to add another administrator.", async () => {
      let customAdmin = await Contract.new();

      //Check if this nonpayable function returns true (as we expect it to).
      await customAdmin.addAdmin.call(accounts[9]).then(function(result) {
        assert.equal(result, true);
      });

      await customAdmin.addAdmin(accounts[1]);
      await customAdmin.addAdmin(accounts[1]).should.be.rejectedWith(EVMRevert);

      await customAdmin.addAdmin(accounts[2], {
        from: accounts[1]
      });

      await customAdmin.addAdmin(accounts[2]).should.be.rejectedWith(EVMRevert);

      const { logs } = await customAdmin.addAdmin(accounts[3], {
        from: accounts[2]
      });

      assert.equal(logs.length, 1);
      assert.equal(logs[0].event, "AdminAdded");
      assert.equal(logs[0].args.account, accounts[3]);

      assert.equal(await customAdmin.isAdmin(accounts[0]), true);
      assert.equal(await customAdmin.isAdmin(accounts[1]), true);
      assert.equal(await customAdmin.isAdmin(accounts[2]), true);
      assert.equal(await customAdmin.isAdmin(accounts[3]), true);
      assert.equal(await customAdmin.isAdmin(accounts[4]), false);
    });

    it("must allow an administrator to remove another administrator.", async () => {
      let customAdmin = await Contract.new();

      await customAdmin.addAdmin(accounts[9]);
      await customAdmin.addAdmin(accounts[9]).should.be.rejectedWith(EVMRevert);

      //Check if this nonpayable function returns true (as we expect it to).
      await customAdmin.removeAdmin.call(accounts[9]).then(function(result) {
        assert.equal(result, true);
      });

      await customAdmin.addAdmin(accounts[1]);
      await customAdmin.addAdmin(accounts[2], {
        from: accounts[1]
      });
      await customAdmin.addAdmin(accounts[3], {
        from: accounts[2]
      });

      assert.equal(await customAdmin.isAdmin(accounts[0]), true);
      assert.equal(await customAdmin.isAdmin(accounts[1]), true);
      assert.equal(await customAdmin.isAdmin(accounts[2]), true);
      assert.equal(await customAdmin.isAdmin(accounts[3]), true);

      //suicide
      await customAdmin.removeAdmin(accounts[3], {
        from: accounts[3]
      });
      await customAdmin.removeAdmin(accounts[2], {
        from: accounts[2]
      });
      await customAdmin.removeAdmin(accounts[1], {
        from: accounts[1]
      });

      //The owner cannot be removed from this list.
      await customAdmin.removeAdmin(owner).should.be.rejectedWith(EVMRevert);

      await customAdmin.addManyAdmins([accounts[1], accounts[2], accounts[3]]);

      await customAdmin.removeAdmin(accounts[3], {
        from: accounts[1]
      });
      await customAdmin
        .removeAdmin(accounts[2], {
          from: accounts[3]
        })
        .should.be.rejectedWith(EVMRevert); //you're no longer an administrator
      await customAdmin.removeAdmin(accounts[2], {
        from: accounts[1]
      });

      const { logs } = await customAdmin.removeAdmin(accounts[1], {
        from: accounts[1]
      });

      assert.equal(logs.length, 1);
      assert.equal(logs[0].event, "AdminRemoved");
      assert.equal(logs[0].args.account, accounts[1]);

      await customAdmin
        .addAdmin(accounts[2], {
          from: accounts[1]
        })
        .should.be.rejectedWith(EVMRevert); //you're no longer an administrator
    });

    it("must correctly add many admins.", async () => {
      const newAdmins = [accounts[1], accounts[2], accounts[3], accounts[5]];
      const { logs } = await customAdmin.addManyAdmins(newAdmins);

      assert.equal(logs.length, newAdmins.length);

      for (let i = 0; i < newAdmins.length; i++) {
        assert.equal(logs[i].event, "AdminAdded");
        assert.equal(logs[i].args.account, newAdmins[i]);
      }

      assert.equal(await customAdmin.isAdmin(accounts[0]), true);
      assert.equal(await customAdmin.isAdmin(accounts[1]), true);
      assert.equal(await customAdmin.isAdmin(accounts[2]), true);
      assert.equal(await customAdmin.isAdmin(accounts[3]), true);
      assert.equal(await customAdmin.isAdmin(accounts[4]), false);
      assert.equal(await customAdmin.isAdmin(accounts[5]), true);
      assert.equal(await customAdmin.isAdmin(accounts[6]), false);
    });

    it("must correctly remove many admins.", async () => {
      await customAdmin.addManyAdmins([
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[5],
        accounts[6],
        accounts[7],
        accounts[8],
        accounts[9]
      ]);

      assert.equal(await customAdmin.isAdmin(accounts[0]), true);
      assert.equal(await customAdmin.isAdmin(accounts[1]), true);
      assert.equal(await customAdmin.isAdmin(accounts[2]), true);
      assert.equal(await customAdmin.isAdmin(accounts[3]), true);
      assert.equal(await customAdmin.isAdmin(accounts[4]), false);
      assert.equal(await customAdmin.isAdmin(accounts[5]), true);
      assert.equal(await customAdmin.isAdmin(accounts[6]), true);
      assert.equal(await customAdmin.isAdmin(accounts[7]), true);
      assert.equal(await customAdmin.isAdmin(accounts[8]), true);
      assert.equal(await customAdmin.isAdmin(accounts[9]), true);

      const toRemove = [accounts[1], accounts[5], accounts[7], accounts[8]];

      const { logs } = await customAdmin.removeManyAdmins(toRemove);

      assert.equal(logs.length, toRemove.length);

      for (let i = 0; i < toRemove.length; i++) {
        assert.equal(logs[i].event, "AdminRemoved");
        assert.equal(logs[i].args.account, toRemove[i]);
      }

      assert.equal(await customAdmin.isAdmin(accounts[0]), true);
      assert.equal(await customAdmin.isAdmin(accounts[1]), false);
      assert.equal(await customAdmin.isAdmin(accounts[2]), true);
      assert.equal(await customAdmin.isAdmin(accounts[3]), true);
      assert.equal(await customAdmin.isAdmin(accounts[4]), false);
      assert.equal(await customAdmin.isAdmin(accounts[5]), false);
      assert.equal(await customAdmin.isAdmin(accounts[6]), true);
      assert.equal(await customAdmin.isAdmin(accounts[7]), false);
      assert.equal(await customAdmin.isAdmin(accounts[8]), false);
      assert.equal(await customAdmin.isAdmin(accounts[9]), true);
    });
  });
});
