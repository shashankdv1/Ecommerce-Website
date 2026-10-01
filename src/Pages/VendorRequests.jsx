import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VendorRequests()
{
    const navigate=useNavigate();
     const[ProductName,setProductName]=useState("");
            const[Price,setPrice]=useState("");
            const[image,setImage]=useState("");
            const[Category,setCategory]=useState("");
            const[ProductDescription,setDescription]=useState("");
            const[OrganizationCode,setCode]=useState("");

    const handleInsertion=async(e)=>
    {
        
         const formData = new FormData();
            formData.append("ProductName", ProductName);
            formData.append("Price", Price);
            formData.append("Category", Category);
            formData.append("ProductDescription", ProductDescription);
            formData.append("image", image);
             formData.append("OrganizationCode", OrganizationCode);
        e.preventDefault();
        try{

        const res = await axios.post("http://localhost:8000/vendor/RequestManagement",formData,
                    {
                 headers: {
                    "Content-Type": "multipart/form-data",
                         },
            });
                    if (res.data.success) {
                        alert("Request sent successfully");
                        navigate("/Requests");
                    }
                      else{
                        alert(res.data.msg);
                      }
                }
                catch(error)
                {
                    console.log(error);
                   alert(error.response?.data?.msg || "Item not Added Succesfully");
                }
   
    }
return(
    <form onSubmit={handleInsertion}>
       <label for="productName">ProductName: </label> <input onChange={(e)=>{setProductName(e.target.value)}}name="productName" type="text" placeholder="Please Enter your product Name" required></input><br />
        <label for="productPrice">Price: </label> <input onChange={(e)=>{setPrice(e.target.value)}}name="productPrice" type="number" placeholder="Please Enter your product price" required></input><br />
        <label for="productCategory">Category: </label> <input onChange={(e)=>{setCategory(e.target.value)}}name="productCategory" type="text" placeholder="Please Enter your product category" required></input><br />
         <label for="OrganizationCode">Organization code: </label> <input onChange={(e)=>{setCode(e.target.value)}} name="OrganizationCode" type="text" placeholder="Please Enter your organizational code" required></input><br />
         <label for="OrganizationCode">Product Description: </label> <input onChange={(e)=>{setDescription(e.target.value)}} name="Description" type="text" placeholder="Please Enter your Product Description" required></input><br />
          <h2>Add Image:</h2>
            <input type="file" onChange={(e)=>{setImage(e.target.value)}} />
        <button type="submit">Submit</button>
    </form>
)
}
export default VendorRequests;