import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { APIContext } from '../../contexts/APIContext'
// import './style.css'
import { data, event } from 'jquery'
import SignUpForm from '../SignUpForm'
import { useNavigate } from 'react-router-dom'


const PersonalInfoRow  = ({label, value}) => {
    const [verbose, setverbose] = useState("")

    useEffect(() => {


        if (label == 'username'){
            setverbose('Username:')

        } else if (label == 'email'){
            setverbose('Email:')
        }else if (label == 'first_name'){
            setverbose('First Name:')
        }else if (label == 'last_name'){
            setverbose('Last Name:')
        }else if (label == 'phone_num'){
            setverbose('Phone Number:')
        }

    }, [])

    return (

        <tr>
            <td>{verbose}</td>
            <td>{value}</td>
        </tr>

    )

}




export const PersonalUpdateForm = () => {

    const {user_info, setUser} = useContext(APIContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (localStorage.getItem("token")) {

            navigate("/authenticated/update_info")
            
        }else{
            navigate("/login")
        }
    
        }, []);

    useEffect(() => {

		fetch("http://127.0.0.1:8000/accounts/info/",{

            method: 'GET',
            headers: {
            
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                
            
            }

        })
        .then(response => response.json())
        .catch(error => { console.log('err') })
        .then(data => {
            console.log(data)
            setUser(

                {

                    id: data.id,
                    username: data.username,
                    email: data.email,
                    phone_num: data.phone_num,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar


                }
            )
        }).then(console.log("userinfo"+ user_info))}, [])

    
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_num, setPhoneNum] = useState("")
    const [username, setUsername] = useState("")



    

        


    
    return (
        <section className="section">
		<div className="container">
			<div className="columns is-centered is-multiline">
				<div className="column is-4-desktop is-6-tablet is-12-mobile">
					<figure className="image is-square">
						<img className="is-rounded" src={user_info.avatar}/>
					</figure>
				</div>
				<div className="column is-8-desktop is-6-tablet is-12-mobile">
					<h1 className="title is-1">{user_info.first_name + ' ' + user_info.last_name}</h1>
					<div className='column'>
                   
                    
                        <form className="box p-5" >
                           

                            <label className="is-block mb-4" htmlFor={"username"}>

                                <span className="is-block mb-2">Username:</span>
                                <input id="username" className="input" type="text" value={username} onChange={(event) => (setUsername(event.target.value))}/>
                            </label>

                            <label className="is-block mb-4" htmlFor={"first_name"}>
                                
                                <span className="is-block mb-2">First Name:</span>
                                <input id="first_name" className="input" type="text" value={first_name} onChange={(event) => (setFirstName(event.target.value))}/>

                            </label>
                            <label className="is-block mb-4" htmlFor={"last_name"}>

                                <span className="is-block mb-2">Last Name:</span>
                                <input id="last_name" className="input" type="text" value={last_name} onChange={(event) => (setLastName(event.target.value))}/>


                            </label>

                            <label className="is-block mb-4" htmlFor={"email"}>
                            
                                <span className="is-block mb-2">Email:</span>
                                <input id="email" className="input" type="text" value={email} onChange={(event) => (setEmail(event.target.value))}/>

                            </label>

                            <label className="is-block mb-4" htmlFor={"phone_num"}>

                                <span className="is-block mb-2">Phone Number:</span>

                                <input id="phone_num" className="input" type="text" value={phone_num} onChange={(event) => (setPhoneNum(event.target.value))}/>

                            </label>


 

                            <button className="button is-primary" type="submit" onClick={() => {
                                data = {first_name: first_name
                                     , last_name: last_name
                                     , email: email
                                     , phone_num: phone_num
                                     , username: username
                                    
                                    }

                                fetch("http://localhost:8000/accounts/edit/" + user_info.id + "/", { 
                            
                                    method: 'PUT',
                                    body: JSON.stringify(data),
                                    headers: {
                                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                                        'Content-Type': 'application/json'
                                    }
                        
                                }).then(response => response.json()).catch(error => { console.log('err') }).then(data => { 
                                    
                                    console.log(data) 
                                    }
                                    )
                        
                                navigate('/authenticated/user_info')
                                }

                            }
                                
                            >Update</button>

                        </form>                                    


					</div>
				</div>
			</div>
		</div>
	</section>


    )


}


const PersonalInfoTable = () => {

    const {user_info, setUser} = useContext(APIContext)
    const navigate = useNavigate()

    return (<>

                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th colspan="2" className="has-text-left">Personal Info:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            Object.keys(user_info).map((label, index) => {

                                    console.log(label)
                                    
                                    if(label !== 'avatar' && label !== 'id'){
        
                                        return <PersonalInfoRow key={index} label={label} value={user_info[label]} />
        
                                    }
        
                                }
                            )

                        }
                    </tbody>
                </table>

                <div className="buttons has-addons is-right">
                    <button className="button is-primary" onClick={(event) => {navigate('/authenticated/update_info')}}>update</button>
                </div>
            </>


    )

}



const PersonalInfoDetail = () => {

    const[Edit, setEdit] = useState(false)
    const {user_info, setUser} = useContext(APIContext)
    const[new_info, setNewInfo] = useState(user_info)


    useEffect(() => {

        if (Edit === true){

            setNewInfo(user_info)

        }


    }, [Edit])



    // if (Edit){

    //     return(<>

    //         <PersonalUpdateForm is_edit={Edit} update={setEdit} new_info={new_info} update_new_info={setNewInfo}/>

    //     </>) 
        

    // }else{


        return(<>

            <PersonalInfoTable is_edit={Edit} update={setEdit} new_info={new_info} update_new_info={setNewInfo} />


        </>) 
    
    // }

}

const PersonalInfo = () => {

	const {user_info, setUser} = useContext(APIContext)

	const [avatar, setAvatar] = useState('')

    const[Edit, setEdit] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {

            navigate("/authenticated/user_info")

        }else{
            navigate("/login")
        }
    
        }, []);



	useEffect(() => {

		fetch("http://127.0.0.1:8000/accounts/info/",{

            method: 'GET',
            headers: {
            
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            
            }

        })
        .then(response => response.json())
        .catch(error => { console.log('err') })
        .then(data => {
            console.log(data)
            setUser(

                {

                    id: data.id,
                    username: data.username,
                    email: data.email,
                    phone_num: data.phone_num,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar


                }
            )
        }).then(console.log("userinfo"+ user_info))


	}, [])

    return (


        <section className="section">
		<div className="container">
			<div className="columns is-centered is-multiline">
				<div className="column is-4-desktop is-6-tablet is-12-mobile">
					<figure className="image is-square">
						<img className="is-rounded" src={user_info.avatar}/>
					</figure>
				</div>
				<div className="column is-8-desktop is-6-tablet is-12-mobile">
					<h1 className="title is-1">{user_info.first_name + ' ' + user_info.last_name}</h1>
					<div className='column'>
                   
                
						<PersonalInfoDetail />
                                    


					</div>
				</div>
			</div>
		</div>
	</section>
    )

}

export default PersonalInfo