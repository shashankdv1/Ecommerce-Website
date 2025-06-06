import axios from "axios";
import { useState,useEffect } from "react";
function Products()
{
   
const [mobileCount,setmblCount]=useState("");
const [ElecCount,setelecCount]=useState("");
const[GroceryCount,setgrocerycount]=useState("");
const[HomeItemcnt,setHomeCount]=useState("");
const[Bookscnt,setBooksCount]=useState("");
const[Autocnt,setAutoCount]=useState("");
const [err,setErr]=useState("");
useEffect(()=>{
axios.get("http://localhost:8000/Categories/Stats").then((res)=>{
if(res.data.success)
{
setmblCount(res.data.MobileCount);
setelecCount(res.data.ElecCount);
setgrocerycount(res.data.GroceryCnt);
setHomeCount(res.data.HomeItemsCnt);
setBooksCount(res.data.BooksCnt);
setAutoCount(res.data.AutoCnt);
}
}).catch((error)=>{
console.log(error);
setErr(error);
});
},[])
if(err)return(<h1>Something Went Wrong,Please Try Again Later</h1>);
return(<>
<label for="mblCount">Total Mobiles are: </label>
<h1 name="mblCount">{mobileCount}</h1>
<label for="mblCount">Total Electronics Items are: </label>
<h1 name="mblCount">{ElecCount}</h1>
<label for="mblCount">Total Grocery Items are: </label>
<h1 name="mblCount">{GroceryCount}</h1>
<label for="mblCount">Total HomeItems are:</label>
<h1 name="mblCount">{HomeItemcnt}</h1>
<label for="mblCount">Total Books are:</label>
<h1 name="mblCount">{Bookscnt}</h1>
<label for="mblCount">Total AutoMobile Parts are:</label>
<h1 name="mblCount">{Autocnt
    }</h1>
</>)
}

export default Products;