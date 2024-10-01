import React, {useState} from "react";
import {FaEdit} from "react-icons/fa";
import { API_URL } from "../../utils/contants";
import {GrClose} from "react-icons/gr";

const UserEditModal = ({user, setIsListChanged}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState(user.contact);
    const [errors, setErrors] = useState({});

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Handle form validation
    const validateForm = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "First Name is required";
        if (!lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!contact.trim()) newErrors.contact = "Contact is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const token = localStorage.getItem("token");
        const updatedData = {
            first_name: firstName,
            last_name: lastName,
            email,
            contact,
        };

        try {
            const response = await fetch(
                `${API_URL}/users/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );
            const result = await response.json();

            if (response.ok) {
                alert("User updated successfully!");
                setIsListChanged(state => !state);
                toggleModal();
            } else {
                setErrors({apiError: result.message || "Update failed"});
            }
        } catch (error) {
            setErrors({apiError: "An error occurred. Please try again later."});
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                <FaEdit />
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit User
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <GrClose className="text-lg" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form
                                className="p-4 md:p-5"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="first_name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            className={`bg-gray-50 border ${
                                                errors.firstName
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <label
                                            htmlFor="last_name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            className={`bg-gray-50 border ${
                                                errors.lastName
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 text-sm">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={`bg-gray-50 border ${
                                                errors.email
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <label
                                            htmlFor="contact"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Contact
                                        </label>
                                        <input
                                            type="text"
                                            name="contact"
                                            id="contact"
                                            className={`bg-gray-50 border ${
                                                errors.contact
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                            value={contact}
                                            onChange={(e) =>
                                                setContact(e.target.value)
                                            }
                                        />
                                        {errors.contact && (
                                            <p className="text-red-500 text-sm">
                                                {errors.contact}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {errors.apiError && (
                                    <p className="text-red-500 text-sm mb-4">
                                        {errors.apiError}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserEditModal;
