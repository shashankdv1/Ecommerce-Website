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
<p>Total Mobiles are: {mobileCount}</p><br/>
<p>Total Electronics Items are: {ElecCount}</p><br/>
<p>Total Grocery Items are: {GroceryCount}</p><br/>
<p>Total HomeItems are: {HomeItemcnt}</p><br/>
<p>Total Books are: {Bookscnt}</p><br/>
<p>Total AutoMobile Parts are: {Autocnt}</p>
</>)
}

export default Products;