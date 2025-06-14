import { useVendor } from "../userContext";
function VendorCode()
{
    const {vendor}=useVendor();

    if(vendor?.OrgName==null)
    {
        return(<>
        <p>You do not have priviliges to access this page.</p>
        </>)
    }
return(<>
<p>Welcome {vendor.OrgName}</p>

</>)
}
export default VendorCode;