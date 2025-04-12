import{useState,useRef} from 'react'
function Home()
{
    const profileMenuRef = useRef(null); 
        const [isVisible, setIsVisible] = useState(false);
   
    function profileView()
    {  if (profileMenuRef.current) {
        profileMenuRef.current.style.display = isVisible ? 'none' : 'block'; 
        setIsVisible(!isVisible);
      }
      
    }
    return(
        <div class="relative">
<div class="flex justify-normal">
    <p>Store App</p>
    <input class="ml-20 w-52" type="text" placeholder="Please enter the search"></input>
    <button><img class="w-4" src={require("../Images/search.png")}/></button>
    <button onClick={profileView} class="fixed top-0 right-0  bg-green-500 text-white">Your profile</button>
</div>
<div class="flex">
<h1 class="text-2xl">Based on Your Cart and Order History</h1>
<div id ="profileMenu" ref={profileMenuRef} style={{ display: 'none' }} class="absolute w-10  h-6 right-0 bg-red-500">
   <ul>
   <li>Your Orders</li>
   </ul>
</div>
</div>
<div class="flex-col mt-36">
    <ul>
    <li>Product name: </li>
    <li>Price: </li>
    <li>Product catorgy: </li>
    </ul>
</div>
</div>
    );
}

export default Home;
