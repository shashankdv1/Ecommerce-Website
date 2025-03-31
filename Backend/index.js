require("dotenv").config();
const express=require('express');
const{ connectMongoDb } = require('./connection');
const router=require("./routes/user");
const adminrouter=require("./routes/Admin");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port=8000;
const app = express();


app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use("/",router)
app.use("/Admin",adminrouter);
connectMongoDb("mongodb://127.0.0.1:27017/store-details");
app.listen(port ,()=>{
console.log(`Server started listening on port: ${port}`);
});