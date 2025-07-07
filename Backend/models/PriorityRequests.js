const mongoose = require("mongoose");

const priorityRequestSchema=mongoose.Schema({
PriorityRequestId:{
    type:Number,
    required:true,
    unique:true
},
ProductName:{
    type:String,
    required:true,
},
Options:{
    type:String,
    required:true
},
request:{
    type:String,
    required:true
}
});

const priorityRequestModel = mongoose.model("priorityRequests",priorityRequestSchema);

module.exports=priorityRequestModel;
