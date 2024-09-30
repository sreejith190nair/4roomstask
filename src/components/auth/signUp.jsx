import React, {useState} from "react";
import {AUTH_FORMS, API_URL} from "../../utils/contants";

const SignUp = ({handleChangeForm}) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate First Name
        if (!formData.first_name) {
            newErrors.first_name = "First Name is required";
        }

        // Validate Last Name
        if (!formData.last_name) {
            newErrors.last_name = "Last Name is required";
        }

        // Validate Email
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }

        // Validate Contact
        if (!formData.contact) {
            newErrors.contact = "Contact is required";
        }

        // Validate Password
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        // Validate Password Confirmation
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "Confirm Password is required";
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Passwords must match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    contact: "",
                    password: "",
                    password_confirmation: "",
                });
              handleChangeForm(AUTH_FORMS[0]);
            } else {
                setErrors({form: result.message || "An error occurred"});
            }
        } catch (error) {
            setErrors({form: "Network error, please try again later"});
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 ring-1 ring-gray-300 rounded-md w-[90rem] mt-8 p-10"
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl text-gray-800 font-semibold">
                    Sign Up
                </h1>
                <h2 className="text-xl font-thin">
                    Access the 4Rooms hotel panel using your email and password
                </h2>
            </div>
            <div className="grid grid-cols-3 gap-8">
                {/* First Name Field */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="first_name"
                        className="text-xl font-semibold"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className={`w-full ring-1 p-4 rounded-lg ${
                            errors.first_name ? "ring-red-500" : "ring-gray-300"
                        }`}
                    />
                    {errors.first_name && (
                        <p className="text-red-500">{errors.first_name}</p>
                    )}
                </div>

                {/* Last Name Field */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="last_name"
                        className="text-xl font-semibold"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className={`w-full ring-1 p-4 rounded-lg ${
                            errors.last_name ? "ring-red-500" : "ring-gray-300"
                        }`}
                    />
                    {errors.last_name && (
                        <p className="text-red-500">{errors.last_name}</p>
                    )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xl font-semibold">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full ring-1 p-4 rounded-lg ${
                            errors.email ? "ring-red-500" : "ring-gray-300"
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* Contact Field */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="contact" className="text-xl font-semibold">
                        Contact
                    </label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className={`w-full ring-1 p-4 rounded-lg ${
                            errors.contact ? "ring-red-500" : "ring-gray-300"
                        }`}
                    />
                    {errors.contact && (
                        <p className="text-red-500">{errors.contact}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-xl font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full ring-1 p-4 rounded-lg ${
                            errors.password ? "ring-red-500" : "ring-gray-300"
                        }`}
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                    )}
                </div>

                {/* Password Confirmation Field */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password_confirmation"
                        className="text-xl font-semibold"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className={`w-full ring-1 p-4 rounded-lg ${
                            errors.password_confirmation
                                ? "ring-red-500"
                                : "ring-gray-300"
                        }`}
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                {/* Form-wide error message */}
                {errors.form && <p className="text-red-500">{errors.form}</p>}

                <div className="flex flex-col">
                    <button
                        type="submit"
                        className="bg-slate-800 text-white rounded-lg p-3 text-xl"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleChangeForm(AUTH_FORMS[0])}
                        className="max-w-fit mt-4 underline"
                    >
                        Click Here to login
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SignUp;
