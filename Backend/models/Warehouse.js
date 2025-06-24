const mongoose = require("mongoose");
const WarehouseSchema=mongoose.Schema({
warehouseId:{
    type:Number,
    required:true,
    unique:true
},
city:{
    type:String,
    required:true
},
warehouseName:{
    type:String,
    unique:true,
    required:true
},
state:{
    type:String,
    required:true
},
organizationCode:{
    type:String,
    unique:true,
    required:true
}

});

const WarehouseModel=mongoose.model("Warehouse",WarehouseSchema);

module.exports=WarehouseModel;
