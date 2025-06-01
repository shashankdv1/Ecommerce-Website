import { useNavigate } from "react-router-dom";
import { useAdmin } from "../userContext";
const AdminDashboard=()=>{
    const navigate=useNavigate();
     const {admin}=useAdmin();
    const addItems=()=>{
        navigate('/AddItems');
}
const removeItems=()=>{
    navigate('/RemoveItems');
}
 if(admin===null)
            {
               
                return <p>You do not have priviliges to access this page</p>
            } 
    return(<>
    <div class="flex-col">
    <button onClick={addItems} class="w-16 h-16 bg-red-400">AddItems</button><br />
    <button onClick={removeItems} class="w-16 h-16 bg-red-400 mt-7">RemoveItems</button>
    </div>
    </>);
}

export default AdminDashboard;