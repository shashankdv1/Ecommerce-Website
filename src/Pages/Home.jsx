function Home()
{
    return(
        <>
<div class="flex justify-normal">
    <p>Store App</p>
    <input class="ml-20 w-52" type="text" placeholder="Please enter the search"></input>
    <button><img class="w-4" src={require("../Images/search.png")}/></button>
   <button class="fixed top-0 right-0  bg-green-500 text-white">Your profile</button>

</div>
<h1 class="text-2xl mt-7">Based on Your Cart and Order History</h1>
<div class="flex-col">
    <ul>
    <li>Product name: </li>
    <li>Price: </li>
    <li>Product catorgy: </li>
    </ul>
</div>
</>
    );
}
export default Home;
