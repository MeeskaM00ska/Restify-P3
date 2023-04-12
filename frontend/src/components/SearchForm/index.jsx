import React from "react"
import SignUpInput from "../SignUpInput"
import { useState } from "react"
import $ from "jquery"
import { Link, redirect } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const register_info=(username, email, password, repeated_password, phone, firstname, lastname, navigate)=>{


    var formData = new FormData();
    var avatar = document.getElementById('Avatar').files[0];
    formData.append('avatar', avatar);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', repeated_password);
    formData.append('phone_num', phone);
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);


    // console.log(formData._boundary)
    var request = fetch("http://127.0.0.1:8000/accounts/create/", {
        method: 'POST',
        body: formData,
        }
    ).then(response => response.json()).catch(error => {console.log('err')}).then(data => {
        console.log(data);
        navigate("/login");
    })


}

const SignUpForm = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeated_password, setRepeatedPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [avatar, setAvatar] = useState("")

   
    
    return <>
        <div className="container">
            <div className="columns is-justify-content-center">
                <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullh">
                    <form className="box p-5">

                        <SignUpInput input_lable_value="Username"  input_value={username} update={setUsername} placeholder_value="Something" type_value="text" is_required={true}/>

                        <SignUpInput input_lable_value="Email" input_value={email} update={setEmail} placeholder_value="something@example.com" type_value="email" is_required={true} />

                        <SignUpInput input_lable_value="Password" input_value={password} update={setPassword} placeholder_value="(must be 6+ chars)" type_value="password" is_required={true} />

                        <SignUpInput input_lable_value="Repeated_password" input_value={repeated_password} update={setRepeatedPassword} placeholder_value="should match to the password" type_value="password" is_required={true} />

                        <SignUpInput input_lable_value="Phone" input_value={phone} update={setPhone} placeholder_value="(XXX)-XXX-XXXX" type_value="phone" is_required={true} />

                        <SignUpInput input_lable_value="First_name" input_value={firstname} update={setFirstname} placeholder_value="e.g. Harrry" type_value="text" is_required={true} />

                        <SignUpInput input_lable_value="Last_name" input_value={lastname} update={setLastname} placeholder_value="e.g. Potter" type_value="text" is_required={true} />

                        <SignUpInput input_lable_value="Avatar" type_value="file" is_required={true} input_value={avatar} update={setAvatar} />


                        <span>
                            <input className="button is-link" type="register" value="Register" id="register" onClick={() => 
                                register_info(username, email, password, repeated_password, phone, firstname, lastname, navigate)
                                
                                } readOnly/>
                        </span>

                        <div>

                            <div className="dropdown-divider">

                            </div>

                        </div>


                        <div className="mb-4">

                            <span className="is-block mb-2">
                                Have an account?
                            </span>

                        </div>

                        <div className="mb-4">

                            <Link className="button is-link" to="/Login">
                                Log in
                            </Link>
                        
                        </div>

                    </form>
                </div>
            </div>
        </div>
    
    </>


}



export default SignUpForm