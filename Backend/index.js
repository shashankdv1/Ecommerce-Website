require("dotenv").config();
const express=require('express');
const{ connectMongoDb } = require('./connection');
const router=require("./routes/user");
const adminrouter=require("./routes/Admin");
const productRouter=require("./routes/Product");
const Pagerouter=require("./routes/Pages");
const cors = require("cors");
const port=8000;
const app = express();
const authMiddleware=require("./middlewears/index");
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//app.use(authMiddleware());
app.use(session({
    secret: process.env.SESSION_SECRET ||'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI||'mongodb://localhost:27017/store-details' }),
    cookie: {
        maxAge: 1000 * 60 * 60, 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

app.use("/",router)
app.use("/Admin", authMiddleware, adminrouter); 
app.use("/Items",productRouter);
app.use("/Categories",Pagerouter);
/*app.get('/loggedin', (req, res) => {
    console.log(req.session.username);
  if (req.session.username) {
    res.json({ loggedIn: true, name: req.session.username });
  } else {
    res.json({ loggedIn: false });
  }
});*/

connectMongoDb("mongodb://127.0.0.1:27017/store-details");
app.listen(port ,()=>{
console.log(`Server started listening on port: ${port}`);
});