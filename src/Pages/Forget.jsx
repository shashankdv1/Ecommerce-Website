
function Forget()
{
return(<>
<div>
<form>
    <label for="username">Username: </label><input class="w-40"name="username" type="text" placeholder="Please Enter your Registered username of lost account" /><br />
    <label for="Number">Mobile: </label><input name="Number" type="text" placeholder="Please Enter your Registered Mobile Number of lost account" required/><br />
    <label for="Email">Email: </label><input name="Email" type="text" placeholder="Please Enter your Registered email of lost account" /><br />
    <button type="submit" >Submit</button>
</form>
</div>
</>)
}

export default Forget;