
    module.exports = function (app) {
        const modelName = "vendors";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , comment: "Name, p, false, false, false, false, false, false, false, , , , ," },
phone: { type:  String , comment: "Phone, p, false, false, false, false, false, false, false, , , , ," },
email: { type:  String , comment: "Email, p, false, false, false, false, false, false, false, , , , ," },
active: { type:  String , maxLength: 150, index: true, trim: true, comment: "Active, p, false, true, true, true, true, true, true, , , , ," },

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