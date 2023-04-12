import React from "react"
import SignUpInput from "../SignUpInput"
import { useState } from "react"
import $, { data } from "jquery"
import { Link, redirect } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const match_password=(password1, password2)=>{

    if (password1 === password2){
        $("#password2").css('background-color', 'white')
        $("#password2_notification").text("")
        return true

    }else{
        $("#password2").css('background-color', 'red')
        $("#password2").val("")
        $("#password2_notification").text("Repeated password did not match").css('color', 'red')

        return false
    }
}

const check_phone_num=(phone_num)=>{

    var pattern = /^\(\d\d\d\)-\d\d\d-\d\d\d\d$/;
    var is_valid = pattern.test(phone_num)

    if (is_valid){
        $("#phone_num").css('background-color', 'white')
        $("#phone_num_notification").text("")
        return true

    }else {

        $("#phone_num").css('background-color', 'red')
        $("#phone_num").val("")
        $("#phone_num_notification").text("Phone number did not match the pattern or is not valid. Example of valid number, (123)-456-7890").css('color', 'red')
        return false
    }
}

const check_password=(password)=>{
    if (password.trim().length < 5){
        $("#password1").css('background-color', 'red')
        $("#password1").val("")
        $("#password1_notification").text("Passowrd should has at least 6 chars").css('color', 'red')
        return false
    }else{
        $("#password1").css('background-color', 'white')
        $("#password1_num_notification").text("")
        return true
    }

}

const handle_register_event=(username, email, password, repeated_password, phone, firstname, lastname, navigate)=>{


    var formData = new FormData();
    var avatar = document.getElementById('avatar').files[0];
    formData.append('avatar', avatar);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', repeated_password);
    formData.append('phone_num', phone);
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);


    var status_code = ""

    // console.log(formData._boundary)
    var reponse = fetch("http://127.0.0.1:8000/accounts/create/", {
        method: 'POST',
        body: formData,
        } )
        
        reponse.then(response => {
        

            status_code = response.status
            return response.json()

        }).then(data => {

            var fields = ['avatar', 'username', 'email', 'password1', 'password2', 'phone_num', 'first_name', 'last_name']

            if (status_code === 400){

                for (let field in data){
                    if (field === "non_field_errors"){
                        let field_id = "#username"
                        let field_notification = field_id + "_notification"
                        $(field_id).css('background-color', 'red')
                        $(field_id).val("")
                        $(field_notification).text("Username already exists").css('color', 'red')
                        field.pop("username")
                        continue
                    
                    }
                    let field_id = "#" + field
                    let field_notification = field_id + "_notification"

                    $(field_id).css('background-color', 'red')
                    $(field_id).val("")
                    $(field_notification).text(data[field]).css('color', 'red')
                    fields.pop(field)

                }
                for (let field of fields){
                    let field_id = "#" + field
                    let field_notification = field_id + "_notification"
                    $(field_id).css('background-color', 'white')
                    $(field_notification).text("")
                }
                match_password(password, repeated_password)
                check_phone_num(phone)
                check_password(password)
                alert("Some field is not correct")


            }else{

                alert("Sign up successfully!")
                navigate("/login");

            }
        }).catch(error => {

            console.log(error);

        }).then(data => console.log(data));

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

                        <SignUpInput id="username" input_lable_value="Username"  input_value={username} update={setUsername} placeholder_value="Something" type_value="text" is_required={true}/>
                        <p id="username_notification"></p>

                        <SignUpInput id="email" input_lable_value="Email" input_value={email} update={setEmail} placeholder_value="something@example.com" type_value="email" is_required={true} />
                        <p id="email_notification"></p>

                        <SignUpInput id="password1" input_lable_value="Password" input_value={password} update={setPassword} placeholder_value="(must be 6+ chars)" type_value="password" is_required={true} />
                        

                        <SignUpInput id="password2" input_lable_value="Repeated password" input_value={repeated_password} update={setRepeatedPassword} placeholder_value="should match to the password" type_value="password" is_required={true} />
                        <p id="Repeated_password_notification"></p>

                        <SignUpInput id="phone_num" input_lable_value="Phone" input_value={phone} update={setPhone} placeholder_value="(XXX)-XXX-XXXX" type_value="phone" is_required={true} />
                        <p id="phone_notification"></p>

                        <SignUpInput id="first_name" input_lable_value="First name" input_value={firstname} update={setFirstname} placeholder_value="e.g. Harrry" type_value="text" is_required={true} />
                        <p id="first_name_notification"></p>

                        <SignUpInput id="last_name" input_lable_value="Last name" input_value={lastname} update={setLastname} placeholder_value="e.g. Potter" type_value="text" is_required={true} />
                        <p id="last_name_notification"></p>

                        <SignUpInput id="avatar" input_lable_value="Avatar" type_value="file" is_required={true} input_value={avatar} update={setAvatar} />
                        <p id="avatar_notification"></p>


                        <span>
                            <input className="button is-link" type="register" value="Register" id="register" onClick={() => 
                                handle_register_event(username, email, password, repeated_password, phone, firstname, lastname, navigate)
                                
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