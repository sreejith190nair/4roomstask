import React, {useEffect, useState} from "react";
import Footer from "./components/footer";
import UserList from "./components/users/userList";
import Auth from "./components/auth";
import Header from "./components/header";
import {API_URL} from "./utils/contants";

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                setCurrentUser(null);
                return;
            }

            const response = await fetch(`${API_URL}/current-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (!response.ok) {
              setCurrentUser(null);
            }
          const data = result.data;
            setCurrentUser(data);
        } catch (error) {
            console.error(error);
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-[85vh]">
                {currentUser || isUserAuthenticated ? (
                    <UserList setIsUserAuthenticated={setIsUserAuthenticated} />
                ) : (
                    <Auth setIsUserAuthenticated={setIsUserAuthenticated} />
                )}
            </main>
            <Footer />
        </>
    );
};

export default App;
