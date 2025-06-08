import { useUser } from "../userContext";
function Help(){
    const {user}=useUser();
     if(user?.name==null){
return(<>
<h1>You are not logged in please login to get More help.<a class="bg-blue-50"  href="http://localhost:3000/Login">Login</a>If you dont have any account <a class="bg-blue-50"  href="http://localhost:3000/Register">Register</a></h1><br/>
<p>If you Lost or forget your account</p>
</>)
     }
}
export default Help;