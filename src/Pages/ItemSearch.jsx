import axios from "axios";
import { useState,useEffect } from "react";

function ItemSearch() {
  const [searchText, setsearchText] = useState("");
  const [Item, setItemName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

     const handleClick = (event) => {
        event.preventDefault();
        if (searchText.trim() !== "") {
            setSubmitted(true);
        }
    };
       const handleChange = (event) => {
        setsearchText(event.target.value);
         setItemName("");
          setErr("");
    };

    useEffect(() => {
        if (submitted && searchText.trim() !== "") {
               handleSearch();
            setSubmitted(false);
        }
    }, [submitted, searchText]);

    const handleSearch=async()=>{
       try {
     const res = await axios.post("http://localhost:8000/Items/searchItem", { searchText },{withCredentials:true});
      if (res.data.success) {
        setItemName(res.data.ItemName);
        setErr("");
      } else {
        setErr(res.data.msg);
        setItemName("");
      }
    } catch (error) {
      setErr(error.message || "Internal Server Error");
    }
    }
  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          class="ml-20 w-52"
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder="Please enter the search"
        />
        <button type="submit" onClick={handleClick}>
          <img className="w-4" src={require("../Images/search.png")} alt="search" />
        </button>
      </form>
    <div class="flex-col">
      {Item && <ul>Search results:
        <li>{Item}</li>
        </ul>}
      {err && <p className="ml-20 mt-3 text-red-500">No Matching search results Found</p>} 
      </div>
    </>
  );
}

export default ItemSearch;
