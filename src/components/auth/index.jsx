import React, {useState} from "react";
import {AUTH_FORMS} from "../../utils/contants";
import SignUp from "./signUp";
import SignIn from "./signIn";

const Auth = ({setIsUserAuthenticated}) => {
    const [authForm, setAuthForm] = useState(AUTH_FORMS[0]);
    const handleChangeForm = (value) => {
        if (!AUTH_FORMS.includes(value)) {
            return;
        }
        setAuthForm(value);
    };
    return (
        <div className="flex flex-col justify-center items-center my-5">
            <img src="/4rooms-logo.png" width={150} height={150} />
            {authForm === AUTH_FORMS[1] ? (
                <SignUp handleChangeForm={handleChangeForm} />
            ) : (
                <SignIn
                    handleChangeForm={handleChangeForm}
                    setIsUserAuthenticated={setIsUserAuthenticated}
                />
            )}
        </div>
    );
};

export default Auth;
