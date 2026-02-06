const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("vendors service", () => {
  let thisService;
  let vendorCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("vendors");

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
    assert.ok(thisService, "Registered the service (vendors)");
  });

  describe("#create", () => {
    const options = {"name":"new value","phone":"new value","email":"new value","active":"new value"};

    beforeEach(async () => {
      vendorCreated = await thisService.create({...options, ...users});
    });

    it("should create a new vendor", () => {
      assert.strictEqual(vendorCreated.name, options.name);
assert.strictEqual(vendorCreated.phone, options.phone);
assert.strictEqual(vendorCreated.email, options.email);
assert.strictEqual(vendorCreated.active, options.active);
    });
  });

  describe("#get", () => {
    it("should retrieve a vendor by ID", async () => {
      const retrieved = await thisService.findById(vendorCreated._id);
      assert.strictEqual(retrieved._id.toString(), vendorCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","phone":"updated value","email":"updated value","active":"updated value"};

    it("should update an existing vendor ", async () => {
      const vendorUpdated = await thisService.findByIdAndUpdate(
        vendorCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(vendorUpdated.name, options.name);
assert.strictEqual(vendorUpdated.phone, options.phone);
assert.strictEqual(vendorUpdated.email, options.email);
assert.strictEqual(vendorUpdated.active, options.active);
    });
  });

  describe("#delete", () => {
    it("should delete a vendor", async () => {
      const vendorDeleted = await thisService.remove(vendorCreated._id);
      assert.strictEqual(vendorDeleted._id.toString(), vendorCreated._id.toString());
    });
  });
});