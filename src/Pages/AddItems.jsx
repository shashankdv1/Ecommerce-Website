import React from "react";
import {useState} from"react";
function AddItems()
{
        const [file, setFile] = useState();
        function handleChange(e) {
            console.log(e.target.files);
            setFile(URL.createObjectURL(e.target.files[0]));
        }
        
    return(
    <div className="flex justify-center items-center">
        <form className="flex flex-col">
        <div className="flex items-center gap-4">
        <label for="name">ProductId: </label>
        <input className="flex-1 border-b-2"type="text" name="name" placeholder="Enter your Product ID"></input>
            <label for="name">Name: </label>
            <input className="flex-1 border-b-2"type="text" name="name" placeholder="Enter your Product name"></input>
            </div>
            <div className="flex items-center gap-4">
            <label for="price">Price: </label>
            <input type="number" className="p-2" name="price" placeholder="Enter your Product price"></input>
            </div>
            <div className="flex items-center gap-4">
            <label for="category">Category: </label>
            <input type="text" name="category" className="p-2" placeholder="Enter your Product Category"></input>
            </div>
            <div className="flex items-center gap-4">
            <label for="description">Description</label>
            <input type="text" name="description" placeholder="Enter your product description"></input>
            </div>
            <div className="App">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} className="w-20" />
        </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default AddItems;