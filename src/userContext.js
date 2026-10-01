import  { createContext, useContext, useState } from "react";

const UserContext = createContext();


export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const savedUser = sessionStorage.getItem("user");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  const saveUser = (userData) => {
    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
      if(userData.name===null){
      sessionStorage.removeItem("user");
    }
    } else{
      sessionStorage.removeItem("user");
    }
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const savedAdmin = sessionStorage.getItem("admin");
  const [admin, setAdmin] = useState(savedAdmin ? JSON.parse(savedAdmin) : null);

  const saveAdmin = (adminData) => {
    if (adminData) {
      sessionStorage.setItem("admin", JSON.stringify(adminData));
      if(adminData.name===null){
      sessionStorage.removeItem("admin");
    }
    } else{
      sessionStorage.removeItem("admin");
    }
    setAdmin(adminData);
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin: saveAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

const VendorContext = createContext();
export const useVendor = () => useContext(VendorContext);

export const VendorProvider = ({ children }) => {
  const savedVendor = sessionStorage.getItem("vendor");
  const [vendor, setVendor] = useState(savedVendor ? JSON.parse(savedVendor) : null);

  const saveVendor = (vendorData) => {
    if (vendorData) {
      sessionStorage.setItem("vendor", JSON.stringify(vendorData));
      if(vendorData.name===null){
      sessionStorage.removeItem("vendor");
    }
    } else{
      sessionStorage.removeItem("vendor");
    }
    setVendor(vendorData);
  };

  return (
    <VendorContext.Provider value={{ vendor, setVendor: saveVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

