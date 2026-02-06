
    module.exports = function (app) {
        const modelName = "work_orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            workOrderNumber: { type:  String , comment: "Work Order Number, p, false, false, false, false, false, false, false, , , , ," },
incidentId: { type:  String , comment: "Incident Id, p, false, false, false, false, false, false, false, , , , ," },
vendorId: { type:  String , comment: "Vendor Id, p, false, false, false, false, false, false, false, , , , ," },
assignedDate: { type: Number, comment: "Assigned Date, p_number, false, false, false, false, false, false, false, , , , ," },
completed: { type: Boolean, required: false, comment: "Completed, p_boolean, false, false, false, false, false, false, false, , , , ," },
remarks: { type:  String , comment: "Remarks, p, false, false, false, false, false, false, false, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };