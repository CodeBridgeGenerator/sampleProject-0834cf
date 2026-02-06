const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("workOrders service", () => {
  let thisService;
  let workOrderCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("workOrders");

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
    assert.ok(thisService, "Registered the service (workOrders)");
  });

  describe("#create", () => {
    const options = {"workOrderNumber":"new value","incidentId":"new value","vendorId":"new value","assignedDate":23,"completed":true,"remarks":"new value"};

    beforeEach(async () => {
      workOrderCreated = await thisService.create({...options, ...users});
    });

    it("should create a new workOrder", () => {
      assert.strictEqual(workOrderCreated.workOrderNumber, options.workOrderNumber);
assert.strictEqual(workOrderCreated.incidentId, options.incidentId);
assert.strictEqual(workOrderCreated.vendorId, options.vendorId);
assert.strictEqual(workOrderCreated.assignedDate, options.assignedDate);
assert.strictEqual(workOrderCreated.completed, options.completed);
assert.strictEqual(workOrderCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a workOrder by ID", async () => {
      const retrieved = await thisService.findById(workOrderCreated._id);
      assert.strictEqual(retrieved._id.toString(), workOrderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"workOrderNumber":"updated value","incidentId":"updated value","vendorId":"updated value","assignedDate":100,"completed":false,"remarks":"updated value"};

    it("should update an existing workOrder ", async () => {
      const workOrderUpdated = await thisService.findByIdAndUpdate(
        workOrderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(workOrderUpdated.workOrderNumber, options.workOrderNumber);
assert.strictEqual(workOrderUpdated.incidentId, options.incidentId);
assert.strictEqual(workOrderUpdated.vendorId, options.vendorId);
assert.strictEqual(workOrderUpdated.assignedDate, options.assignedDate);
assert.strictEqual(workOrderUpdated.completed, options.completed);
assert.strictEqual(workOrderUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
    it("should delete a workOrder", async () => {
      const workOrderDeleted = await thisService.remove(workOrderCreated._id);
      assert.strictEqual(workOrderDeleted._id.toString(), workOrderCreated._id.toString());
    });
  });
});