
    module.exports = function (app) {
        const modelName = "contracts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            contractNumber: { type:  String , comment: "Contract Number, p, false, false, false, false, false, false, false, , , , ," },
title: { type:  String , comment: "Title, p, false, false, false, false, false, false, false, , , , ," },
startDate: { type: Number, comment: "Start Date, p_number, false, false, false, false, false, false, false, , , , ," },
endDate: { type: Number, comment: "End Date, p_number, false, false, false, false, false, false, false, , , , ," },
value: { type: Number, comment: "Value, p_number, false, false, false, false, false, false, false, , , , ," },
vendorId: { type: [Schema.Types.ObjectId], ref: "vendors", description: "isArray", comment: "Vendor Id, multiselect, false, true, true, true, true, true, true, vendors, vendors, one-to-many, name," },

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