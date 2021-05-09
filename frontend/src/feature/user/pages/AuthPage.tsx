import React from "react";
import {SignupForm} from "../components/SignupForm";
import {LoginForm} from "../components/LoginForm";

export const AuthPage = () => {

    return (
        <div>
            <SignupForm/>
            <LoginForm/>
        </div>
    )
}