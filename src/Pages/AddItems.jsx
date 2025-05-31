import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../userContext";
function AddItems()
{
        const {admin}=useAdmin();
        const navigate=useNavigate();
        const[username,setUsername]=useState("");
        const[price,setPrice]=useState("");
        const[image,setImage]=useState("");
        const[category,setCategory]=useState("");
        const[description,setDescription]=useState("");
        const ItemsInsertion=async(e)=>{
             e.preventDefault();
           const formData = new FormData();
            formData.append("Name", username);
            formData.append("Price", price);
            formData.append("Category", category);
            formData.append("Description", description);
            formData.append("Image", image);
            try{
                    const res = await axios.post(
                       "http://localhost:8000/Items/AddItems",formData,
                    {
                 headers: {
                    "Content-Type": "multipart/form-data",
                         },
            });
                    if (res.data.success) {
                        alert("Item added successfully");
                        navigate("/");
                    }
                      else{
                        alert(res.data.msg);
                      }
                }
                catch(error)
                {
                   alert(error.response?.data?.msg || "Item not Added Succesfully");
                }
            }     
            
        if(admin===null)
            {
               
                return <p>You do not have priviliges to access this page</p>
            }   
    return(
    <div className="flex justify-center items-center">
        <form onSubmit={ItemsInsertion} className="flex flex-col">
        <div className="flex items-center gap-4">
            <label for="name">Name: </label>
            <input onChange={(e)=>{setUsername(e.target.value)}} className="flex-1 border-b-2"type="text" name="username" placeholder="Enter your Product name"></input>
            </div>
            <div className="flex items-center gap-4">
            <label for="price">Price: </label>
            <input onChange={(e)=>{setPrice(e.target.value)}} type="number" className="p-2" name="price" placeholder="Enter your Product price"></input>
            </div>
            <div className="flex items-center gap-4">
            <label for="category">Category: </label>
            <input onChange={(e)=>{setCategory(e.target.value)}} type="text" name="category" className="p-2" placeholder="Enter your Product Category"></input>
            </div>
            <div className="flex items-center gap-4">
            <label for="description">Description</label>
            <input type="text" onChange={(e)=>{setDescription(e.target.value)}} name="description" placeholder="Enter your product description"></input>
            </div>
            <div className="App">
            <h2>Add Image:</h2>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default AddItems;