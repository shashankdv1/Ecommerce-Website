function DeliveryPartnerRegister()
{
    return(<>
    <form>
       <label for="partnerEmail">Email: </label><input name="partnerEmail" placeholder="Please Enter your email" type="email"></input><br/>
        <label for="MobileNumber">Mobile Number:
            
            </label><input type="text" name="MobileNumber" placeholder="Please Enter your Mobile Number"></input><br/>
        <label for="partnerRegion"></label>Region: <input name="partnerRegion" placeholder="Please Enter your region"></input><br/>
        <label for="partnerCity"></label>City<input name="partnerCity" placeholder="Please Enter your City"></input><br/>
        <label for="partnerState">State: </label><input name="partnerState" placeholder="Please Enter your state"></input><br/>
        <label for="jobType">Job Type:</label><select name="jobType">
            <option value="Job Type">Job Type</option>
             <option value="Part-Time">Part Time</option>
              <option value="Full-Time">Full Time</option>
        </select><br/>
        <label for="password">Password: </label><input type="password" name="password" placeholder="Please Enter your password"></input><br/>
        <label for="Confirmpassword">Confirm-Password: </label><input type="password" name="Confirmpassword" placeholder="Please Enter your password again to confirm"></input><br/>
        <button type="button">Submit</button>
    </form>
    </>);
}

export default DeliveryPartnerRegister;