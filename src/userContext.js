import { createContext, useContext, useState } from "react";

// Create User Context
const UserContext = createContext();

// User Provider to Wrap the App
export function UserProvider({ children }) {
    const [user, setUser] = useState(null); // Store user data after login

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom Hook to Access User Data
export function useUser() {
    return useContext(UserContext);
}
