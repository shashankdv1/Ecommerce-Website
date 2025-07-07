import { useVendor } from "../userContext"
function VendorMain()
{
    const {vendor}=useVendor("");
    if(vendor?.OrgName==null)
     {
        return<>
        <li class="bg-red-100">{"Guest"}</li>
        <button><a href="http://localhost:3000/vendorLogin">Login</a></button><br/>
        <button><a href="http://localhost:3000/Register">Register</a></button><br/>
        <button><a href="http://localhost:3000/Help">Help and Support</a></button><br/>
        </>
     }
    return(<>
    <a href="http://localhost:3000/Requests"><button type="button">RequestItem</button></a>
    
    </>)
}

export default VendorMain;