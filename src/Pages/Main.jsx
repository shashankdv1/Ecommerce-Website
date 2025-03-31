import { useUser } from "../userContext"
function Main()
{
    
    const {user} = useUser();
    return(
<div>
<h1>Welcome, {user?.name || "Guest"}!</h1>
</div>
    );
}
export default Main;