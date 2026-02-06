const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("incidents service", () => {
  let thisService;
  let incidentCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("incidents");

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
    assert.ok(thisService, "Registered the service (incidents)");
  });

  describe("#create", () => {
    const options = {"incidentNumber":"new value","issueType":"new value","location":"new value","reportedDate":23,"status":"new value","contractId":"new value"};

    beforeEach(async () => {
      incidentCreated = await thisService.create({...options, ...users});
    });

    it("should create a new incident", () => {
      assert.strictEqual(incidentCreated.incidentNumber, options.incidentNumber);
assert.strictEqual(incidentCreated.issueType, options.issueType);
assert.strictEqual(incidentCreated.location, options.location);
assert.strictEqual(incidentCreated.reportedDate, options.reportedDate);
assert.strictEqual(incidentCreated.status, options.status);
assert.strictEqual(incidentCreated.contractId, options.contractId);
    });
  });

  describe("#get", () => {
    it("should retrieve a incident by ID", async () => {
      const retrieved = await thisService.findById(incidentCreated._id);
      assert.strictEqual(retrieved._id.toString(), incidentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"incidentNumber":"updated value","issueType":"updated value","location":"updated value","reportedDate":100,"status":"updated value","contractId":"updated value"};

    it("should update an existing incident ", async () => {
      const incidentUpdated = await thisService.findByIdAndUpdate(
        incidentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(incidentUpdated.incidentNumber, options.incidentNumber);
assert.strictEqual(incidentUpdated.issueType, options.issueType);
assert.strictEqual(incidentUpdated.location, options.location);
assert.strictEqual(incidentUpdated.reportedDate, options.reportedDate);
assert.strictEqual(incidentUpdated.status, options.status);
assert.strictEqual(incidentUpdated.contractId, options.contractId);
    });
  });

  describe("#delete", () => {
    it("should delete a incident", async () => {
      const incidentDeleted = await thisService.remove(incidentCreated._id);
      assert.strictEqual(incidentDeleted._id.toString(), incidentCreated._id.toString());
    });
  });
});