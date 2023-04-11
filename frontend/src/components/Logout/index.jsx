import { useEffect } from "react";
import { redirect, useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate();

    // remove token from local storage
    localStorage.removeItem('token');

    // redirect to login page
    useEffect(() => {
        navigate("/login");
    }
    , []);
}

export default Logout;
