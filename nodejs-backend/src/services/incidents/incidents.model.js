
    module.exports = function (app) {
        const modelName = "incidents";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            incidentNumber: { type:  String , comment: "Incident Number, p, false, false, false, false, false, false, false, , , , ," },
issueType: { type:  String , comment: "Issue Type, p, false, false, false, false, false, false, false, , , , ," },
location: { type:  String , comment: "Location, p, false, false, false, false, false, false, false, , , , ," },
reportedDate: { type: Number, comment: "Reported Date, p_number, false, false, false, false, false, false, false, , , , ," },
status: { type:  String , comment: "Status, p, false, false, false, false, false, false, false, , , , ," },
contractId: { type:  String , comment: "Contract Id, p, false, false, false, false, false, false, false, , , , ," },

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