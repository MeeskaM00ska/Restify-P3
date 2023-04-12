import React, { useContext, useEffect } from "react"
import SignUpInput from "../SignUpInput"
import { useState } from "react"
import $ from "jquery"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { APIContext, useAPIContext } from "../../contexts/APIContext"

const Login=(username, password, navigate, setToken)=>{


    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);


    var request = fetch("http://127.0.0.1:8000/api/token/", {
        method: 'POST',
        body: formData,
    }
    
    ).then(response => response.json()).catch(error => {console.log('err')}).then(data => {
        
        if (data.access){
            localStorage.setItem("token", data.access)
            localStorage.setItem("refresh", data.refresh)
            setToken(data.access)
            navigate("/property/list")
        }
        
        console.log(data)
    })


}

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const {token, setToken } = useContext(APIContext)


    useEffect(() => {
        if (localStorage.getItem("token")){
            navigate("/property/list")
        }
    }, [])

    
    return <>
        <div className="container">
            <div className="columns is-justify-content-center">
                <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullh">
                    <form className="box p-5">

                        <SignUpInput input_lable_value="Username" input_value={username} update={setUsername} placeholder_value="" type_value="text" is_required={true} />

                        <SignUpInput input_lable_value="Password" input_value={password} update={setPassword} placeholder_value="" type_value="password" is_required={true} />
                    
                        <div className="mb-4">
                            <a className="button is-link" onClick={() => {Login(username, password, navigate, setToken)}}>
                                Log in
                            </a>
                        </div>

                        <div>
                            <div className="dropdown-divider">

                            </div>

                            <div className="mb-4">
                                <span className="is-block mb-2">
                                    Don't have an account?
                                </span>
                            </div>

                            <div className="mb-4">
                                <Link to="/signup" className="button is-link">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
    </>


}



export default LoginForm