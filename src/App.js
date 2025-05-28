import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import AddItems from "./Pages/AddItems";
import { UserProvider} from "./userContext"
import Registrations from "./Pages/Registration";
import AdminLogin from "./Pages/AdminLogin";
import BestSellers from "./Pages/BestSellers";
import Offers from "./Pages/Offers";
import Mobile from "./Pages/Mobile";
import Electronics from "./Pages/Electronics";
import HomeAppliances from "./Pages/HomeAppliances";
import Books from "./Pages/Books";
import AutoMobile from "./Pages/AutoMobile";
import Groceries from "./Pages/Groceries";
function App() {
  return (
    <div>
      <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Registrations/>}></Route>
        <Route index element={<Home />} />
        <Route path="/Main" element={<Main />}></Route>
        <Route path="/AddItems" element={<AddItems/>}></Route>
        <Route path="/AdminLogin" element={<AdminLogin/>}></Route>
        <Route path="/BestSellers" element={<BestSellers/>}></Route>
        <Route path="/Offers" element={<Offers/>}></Route>
        <Route path="/Mobile" element={<Mobile/>}></Route>
        <Route path="/Electronics" element={<Electronics/>}></Route>
        <Route path="/HomeAppliances" element={<HomeAppliances/>}></Route>
        <Route path="/Books" element={<Books/>}></Route>
        <Route path="/AutoMobile" element={<AutoMobile/>}></Route>
         <Route path="/Groceries" element={<Groceries/>}></Route>
        
      </Routes>
    </BrowserRouter>
    </UserProvider>
    </div>
  );
}

export default App;
