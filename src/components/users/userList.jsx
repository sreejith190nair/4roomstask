import React, {useEffect, useState} from "react";
import {API_URL} from "../../utils/contants";
import UserEditModal from "./userEditModal";
import UserDeleteModal from "./userDeleteModal";

const UserList = ({setIsUserAuthenticated}) => {
    const [users, setUsers] = useState([]);
    const [isListChanged, setIsListChanged] = useState(false);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const results = await response.json();
            const data = results.users;
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.setItem("token", "");
        setIsUserAuthenticated(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [isListChanged]);

    return (
        <div className="relative overflow-x-auto flex flex-col justify-center items-center">
            {/* Logout button */}
            <div className="w-full flex justify-end p-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>

            {/* User table */}
            <table className="w-[80vw] mt-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                        >
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contact
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Registered At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.length > 0 &&
                        users.map((user) => (
                            <tr
                                className="border-b border-gray-200"
                                key={user.id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                                >
                                    {`${user.first_name} ${user.last_name}`}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 bg-gray-50">
                                    {user.contact}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(
                                        user.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td className="flex px-6 py-4 gap-2">
                                    <UserEditModal
                                        user={user}
                                        setIsListChanged={setIsListChanged}
                                    />
                                    <UserDeleteModal
                                        id={user.id}
                                        setIsListChanged={setIsListChanged}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
