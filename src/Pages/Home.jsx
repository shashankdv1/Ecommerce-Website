import{useState,useRef} from 'react'
import {useUser} from '../userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer.jsx';
function Home()
{
    const{productData}=useUser();
    const profileMenuRef = useRef(null); 
    const sideMenuRef=useRef(null);
    const[isVisiblesideMenu,setIsVisiblesideMenu]=useState(false);
        const [isVisibleprofileMenu, setIsVisibleprofileMenu] = useState(false);
   
    function profileView()
    {  if (profileMenuRef.current) {
        profileMenuRef.current.style.display = isVisibleprofileMenu ? 'none' : 'block'; 
        setIsVisibleprofileMenu(!isVisibleprofileMenu);
      }
    }
      
      function sideMenuView()
      {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.display = isVisiblesideMenu ? 'none' : 'block'; 
            setIsVisiblesideMenu(!isVisiblesideMenu);
      }
    }
      
    return(
        <div class="relative">
<div class="flex justify-normal">
    <a href="http://localhost:3000/"><p>Store App</p></a>
    <input class="ml-20 w-52" type="text" placeholder="Please enter the search"></input>
    <button><img class="w-4" src={require("../Images/search.png")}/></button>
    <button onClick={profileView} class="absolute right-0" >Your profile</button>
</div>
<div class="flex">
<button onClick={sideMenuView}><FontAwesomeIcon icon={faList} />All</button>
<div class="flex" ref={sideMenuRef} style={{ display: 'none' }} > 
    <button class="ml-2">BestSellers</button>
    <button class="ml-2">Offers</button>
    <button class="ml-2">Mobiles</button>
    <button class="ml-2">Electronics</button>
    <button class="ml-2">Home and Kitchen</button>
    <button class="ml-2">Computers</button>
    <button class="ml-2">Books</button>
    <button class="ml-2">Automobile</button>
</div>
</div>
<div>
    <h1>Trending Products</h1>
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
    <li>Product category: </li>
    </ul>
</div>
<Footer/>
</div>
    );
}

export default Home;
