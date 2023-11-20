import React from "react";
import { Input } from "../input";

export const Login = ({ handleLogin, inputValue, handleChange }) => {
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <Input
                type="text"
                value={inputValue.email}
                placeholder="User Email"
                label="Enter User email"
                name="email"
                onChange={handleChange}
            />
            <Input
                type="password"
                value={inputValue.password}
                placeholder="Password"
                label="Enter Password"
                name="password"
                onChange={handleChange}
            />
            <button type="submit" color="primary">Login</button>
        </form>
    );
};
