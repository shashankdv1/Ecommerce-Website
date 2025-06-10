function VendorRequests()
{
return(
    <form>
       <label for="productName">ProductName: </label> <input name="productName" type="text" placeholder="Please Enter your product Name" required></input><br />
        <label for="productPrice">Price: </label> <input name="productPrice" type="number" placeholder="Please Enter your product price" required></input><br />
        <label for="productCategory">Category: </label> <input name="productCategory" type="text" placeholder="Please Enter your product category" required></input><br />
         <label for="OrganizationCode">Orgabnization code: </label> <input name="OrganizationCode" type="text" placeholder="Please Enter your organizational code" required></input><br />
        <button type="submit">Submit</button>
    </form>
)
}
export default VendorRequests;