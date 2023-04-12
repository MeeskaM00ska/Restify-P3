import { createContext } from "react";
import { useState } from "react";


export const APIContext = createContext({

    token: "",
    setToken: () => { },
    user_info: {id: "", username: "", email: "", phone_num: "", first_name: "", last_name: "", avatar: ""},
    setUser: () => { }

});

export function useAPIContext() {

    const [token, setToken] = useState("");
    const [user_info, setUser] = useState({id: "", username: "", email: "", phone_num: "", first_name: "", last_name: "", avatar: ""});

    return {
        token, setToken,
        user_info, setUser
    };
}