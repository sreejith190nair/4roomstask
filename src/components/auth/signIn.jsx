import React, {useState} from "react";
import {AUTH_FORMS, API_URL} from "../../utils/contants";

const SignIn = ({handleChangeForm, setIsUserAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
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
            const response = await fetch(`${API_URL}/auth/sign-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                localStorage.setItem("token", token);
                setFormData({
                    email: "",
                    password: "",
                });
                setIsUserAuthenticated(true);
            } else {
                setErrors({form: data.message || "An error occurred"});
            }
        } catch (error) {
            setErrors({form: "Network error, please try again later"});
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 ring-1 ring-gray-300 rounded-md w-[40rem] mt-8 p-10"
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl text-gray-800 font-semibold">
                    Sign In
                </h1>
                <h2 className="text-xl font-thin">
                    Access the 4Rooms hotel panel using your email and password
                </h2>
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
                    className={`w-full ring-1 p-4 rounded-lg ${
                        errors.email ? "ring-red-500" : "ring-gray-300"
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                    className={`w-full ring-1 p-4 rounded-lg ${
                        errors.password ? "ring-red-500" : "ring-gray-300"
                    }`}
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
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
                    {loading ? "Signing In..." : "Sign In"}
                </button>
                <button
                    type="button"
                    onClick={() => handleChangeForm(AUTH_FORMS[1])}
                    className="max-w-fit mt-4 underline"
                >
                    Click Here to register
                </button>
            </div>
        </form>
    );
};

export default SignIn;
