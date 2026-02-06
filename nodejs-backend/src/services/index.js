const vendors = require("./vendors/vendors.service.js");
const contracts = require("./contracts/contracts.service.js");
const incidents = require("./incidents/incidents.service.js");
const workOrders = require("./workOrders/workOrders.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(vendors);
  app.configure(contracts);
  app.configure(incidents);
  app.configure(workOrders);
    // ~cb-add-configure-service-name~
};
