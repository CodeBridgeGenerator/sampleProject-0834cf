const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("contracts service", () => {
  let thisService;
  let contractCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("contracts");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (contracts)");
  });

  describe("#create", () => {
    const options = {"contractNumber":"new value","title":"new value","startDate":23,"endDate":23,"value":23,"vendorId":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      contractCreated = await thisService.create({...options, ...users});
    });

    it("should create a new contract", () => {
      assert.strictEqual(contractCreated.contractNumber, options.contractNumber);
assert.strictEqual(contractCreated.title, options.title);
assert.strictEqual(contractCreated.startDate, options.startDate);
assert.strictEqual(contractCreated.endDate, options.endDate);
assert.strictEqual(contractCreated.value, options.value);
assert.strictEqual(contractCreated.vendorId, options.vendorId);
    });
  });

  describe("#get", () => {
    it("should retrieve a contract by ID", async () => {
      const retrieved = await thisService.findById(contractCreated._id);
      assert.strictEqual(retrieved._id.toString(), contractCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"contractNumber":"updated value","title":"updated value","startDate":100,"endDate":100,"value":100,"vendorId":"345345345345345345345"};

    it("should update an existing contract ", async () => {
      const contractUpdated = await thisService.findByIdAndUpdate(
        contractCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(contractUpdated.contractNumber, options.contractNumber);
assert.strictEqual(contractUpdated.title, options.title);
assert.strictEqual(contractUpdated.startDate, options.startDate);
assert.strictEqual(contractUpdated.endDate, options.endDate);
assert.strictEqual(contractUpdated.value, options.value);
assert.strictEqual(contractUpdated.vendorId, options.vendorId);
    });
  });

  describe("#delete", () => {
    it("should delete a contract", async () => {
      const contractDeleted = await thisService.remove(contractCreated._id);
      assert.strictEqual(contractDeleted._id.toString(), contractCreated._id.toString());
    });
  });
});