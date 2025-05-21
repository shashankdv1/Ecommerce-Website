import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const DataContext=createContext();
export function UserProvider({ children }) {
    const [user, setUser] = useState(null); 

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
export function DataProvider({children})
{
    const[data,setData]=useState(null);
    return(
        <DataContext.Provider value={{data,setData}}>
            {children}
        </DataContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
export function DataUser()
{
    return useContext(DataContext);
}
