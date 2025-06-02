import { useState} from 'react';
import axios from 'axios';
const RemoveItems=()=>{
    const[Id,setId]=useState("");
    const[Name,setName]=useState("");
    const handleDeletion=async(e)=>{
         e.preventDefault();
        try{
            console.log(Id+" "+Name);
        const res = await axios.post("http://localhost:8000/Items/DeleteItems",{Id,Name},{withCredentials:true});
       
        if(res.data.success)
        {
            alert(`${res.data.name} has been deleted successfully`);
        }
        else{
            alert(res.data.msg);
        }
         }
    catch(error)
        {
            alert(error);
        }
        
    }
    return(
        <>
        <form onSubmit={handleDeletion}>
            <label for="productId">Product Id: </label> <input placeholder='ID is Optional' onChange={(e)=>{setId(e.target.value)}} class="rounded-xl border-black border" name="productId" type="number"></input><br/>
            <label for="ProductName">ProductName: </label><input placeholder='Name is required' onChange={(e)=>{setName(e.target.value)}} class="rounded-xl border-black border" name="ProductName" type="text" required></input><br />

            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default RemoveItems;