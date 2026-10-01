//import {useState} from "react"
import axios from "axios";
function Orders()
{
//const {orders,setOrders} =useState[{}];
async function fetchOrders(){
try{
const res=await axios.get("");
if(res.data.success)
{
    //setOrders();
}
else{
    alert(res.data.msg);
}
}
catch(error)
{
alert("Internal server error");
}
}

return(<>
<h1>Orders</h1>
</>);
}

export default Orders;