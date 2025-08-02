import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem('isLoggedIn')) || false);
    const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
    
    function saveUsers(newUsers) {
        localStorage.setItem('users', JSON.stringify(newUsers));
        setUsers(newUsers);
    }

    function saveLogin(status) {
        localStorage.setItem('isLoggedIn', JSON.stringify(status));
        setIsLoggedIn(status);
    }

    function saveCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
    }


    return (
        <UserContext.Provider value={{ currentUser, saveCurrentUser, isLoggedIn, saveLogin, saveUsers, users }}>
            {children}
        </UserContext.Provider>
    );
}
