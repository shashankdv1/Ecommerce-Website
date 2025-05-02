import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import AddItems from "./Pages/AddItems";
import { UserProvider } from "./userContext"
import Registrations from "./Pages/Registration";
import AdminLogin from "./Pages/AdminLogin";
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
      </Routes>
    </BrowserRouter>
    </UserProvider>
    </div>
  );
}

export default App;
