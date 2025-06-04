import { useUser } from "../userContext"
import{useState,useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer";
import RenderItems from "./RenderItems";
import Logout from "./Logout";
function Main()
{
    
    const {user} = useUser();
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
        <>

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
  <a href=" http://localhost:3000/BestSellers"><button class="ml-2">BestSellers</button></a>
   <a href=" http://localhost:3000/Offers"><button class="ml-2">Offers</button></a>
    <a href=" http://localhost:3000/Mobile"><button class="ml-2">Mobiles</button></a>
    <a href="http://localhost:3000/Electronics"><button class="ml-2">Electronics</button></a>
    <a href="http://localhost:3000/HomeAppliances"><button class="ml-2">Home and Kitchen</button></a>
    <a href="http://localhost:3000/HomeAppliances"><button class="ml-2">Groceries</button></a>
    <a href="http://localhost:3000/Books"><button class="ml-2">Books</button></a>
    <a href="http://localhost:3000/Groceries"><button class="ml-2">Automobile</button></a>
</div>
</div>
<div>
    <h1>Trending Products</h1>
</div>
<div class="flex">
<div id ="profileMenu" ref={profileMenuRef} style={{ display: 'none' }} class="absolute w-10  h-6 right-0">
   <ul>
    <li class="bg-red-100">{user?.name || "Guest"}</li>
   <li><button>Your Orders</button></li> 
   <Logout/>
   </ul>
</div>
</div>
<RenderItems/>
<Footer/>
</div>
</>
    );
}
export default Main;