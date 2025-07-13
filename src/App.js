import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import AddItems from "./Pages/AddItems";
import { AdminProvider, UserProvider,VendorProvider} from "./userContext"
import Registrations from "./Pages/Registration";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminLogin from "./Pages/AdminLogin";
import BestSellers from "./Pages/BestSellers";
import Offers from "./Pages/Offers";
import Mobile from "./Pages/Mobile";
import Electronics from "./Pages/Electronics";
import HomeAppliances from "./Pages/HomeAppliances";
import Books from "./Pages/Books";
import AutoMobile from "./Pages/AutoMobile";
import Groceries from "./Pages/Groceries";
import RemoveItems from "./Pages/RemoveItems";
import Orders from "./Pages/Orders";
import Products from "./Pages/Products";
import Help from "./Pages/Help";
import Forget from "./Pages/Forget";
import WarehouseDashboard from "./Pages/WarehouseDashboard";
import VendorRequests from "./Pages/VendorRequests";
import Vendoerregister from "./Pages/Vendorregister";
import VendorLogin from "./Pages/VendorLogin";
import VendorCode from "./Pages/VendorCode";
import VendorMain from "./Pages/VendorMain";
import PriorityRequests from './Pages/PriorityRequests';
import Displayrequests from "./Pages/Displayrequests";
import DeliveryPartnerRegister from "./Pages/DeliveryPartnerRegister";

function App() {
  return (
    <div>
      <UserProvider>
        <AdminProvider>
           <VendorProvider>
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
         <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
         <Route path="/RemoveItems" element={<RemoveItems/>}></Route>
         <Route path="/Orders" element={<Orders/>}></Route>
         <Route path="/Products" element={<Products/>}></Route>
         <Route path="/Help" element={<Help/>}></Route>
         <Route path="/Forget" element={<Forget/>}></Route>
          <Route path="/Warehouse" element={<WarehouseDashboard/>}></Route>
         <Route path="/WarehouseRequests" element={<VendorRequests/>}></Route>
             <Route path="/VendorRegister" element={<Vendoerregister/>}></Route>
        <Route path="/VendorLogin" element={<VendorLogin/>}></Route>
        <Route path="/vendorCode" element={<VendorCode/>}></Route>
         <Route path="/vendorMain" element={<VendorMain/>}></Route>
           <Route path="/MainRequests" element={<PriorityRequests/>}></Route>
            <Route path="/DisplayRequests" element={<Displayrequests/>}></Route>
            <Route path="/DeliveryPartnerRegister" element={<DeliveryPartnerRegister/>}></Route>
      </Routes>
    </BrowserRouter>
    </VendorProvider>
    </AdminProvider>
    </UserProvider>
    </div>
  );
}

export default App;
