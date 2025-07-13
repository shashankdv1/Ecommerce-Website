import { useAdmin } from "../userContext";
import { useState } from "react";
function RequestManagement()
{
      const {admin}=useAdmin();
     if(admin===null)
            {
               
                return <p>You do not have priviliges to access this page</p>
            } 
    return(<>
    
    </>);
}

export default RequestManagement;