import React from "react"
import SignUpInput from "../SignUpInput"
import { useState } from "react"
import $ from "jquery"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import InputBox from "../GeneralInputBox"


const property_info=(property_name, city, country, address, num_of_guests, num_of_beds,
    property_type)=>{

    var propertyData = new FormData();
    var imagesData = new FormData();

    var notification = document.getElementById('notification');
    // check if the fields are empty
    if (property_name === "" || city === "" || country === "" || address === "" || num_of_guests === "" || num_of_beds === "" || property_type === ""
    || document.getElementById('images').files.length === 0){
        notification.innerHTML = "✗ Please fill in all the fields";
        notification.style.color = "red";
        return;
    }

    notification.innerHTML = "";
    
    // the id for the created property
    var property_id = -1;
    
    //append property data
    var main_pic = document.getElementById('images').files[0];
    propertyData.append('property_name', property_name);
    propertyData.append('city', city);
    propertyData.append('country', country);
    propertyData.append('address', address);
    propertyData.append('num_of_guests', num_of_guests);
    propertyData.append('num_of_beds', num_of_beds);
    propertyData.append('property_type', property_type);
    propertyData.append('main_pic', main_pic);

    // console.log(propertyData._boundary)
    var request = fetch("http://127.0.0.1:8000/property/create/", {
        method: 'POST',
        body: propertyData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }
    ).then(response => response.json()).catch(error => {console.log(error)}).then(data => {
        property_id = data.property_id;
        imagesData.append('belongs_to', property_id);

        // send images to backend
        for (var i = 0; i < document.getElementById('images').files.length; i++) {
            imagesData.append('image', document.getElementById('images').files[i]);
    
            fetch("http://127.0.0.1:8000/property/image/create/", {
                method: 'POST',
                body: imagesData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                if (response.status === 400){

                }
            })
            .catch(error => {console.log('err')})
            .then(data => {
                console.log(data);
            });
    
            imagesData.delete('image');
        }
    });

    notification.innerHTML = "&check; Property created successfully";
    notification.style.color = "green";

}

const CreatePropertyForm = () => {

    const [propertyName, setPropertyName] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [numOfGuests, setNumOfGuests] = useState("")
    const [numOfBeds, setNumOfBeds] = useState("")
    const [propertyType, setPropertyType] = useState("")

    const navigate = useNavigate();
    
    return <>

                <div className="box has-text-centered">

                <div className="hero is-small">
                    <div className="hero-body">

                    </div>
                </div>
                    <div className="columns">
                    <div className="column is-2 "></div>
                        <h1 className="is-size-5-mobile is-size-3-desktop title"> Adding a new property </h1>

                        <div className="column is-2 "></div>
                    </div>

                <div className="hero is-small">
                    <div className="hero-body">

                    </div>
                </div>

                <InputBox name='Property Name' id='propertyName' func={setPropertyName} input_type='text' />
                <InputBox name='City' id='city' func={setCity} input_type='text' />
                <InputBox name='Country' id='country' func={setCountry} input_type='text' />
                <InputBox name='Address' id='address' func={setAddress} input_type='text' />
                <InputBox name='Number of Guests' id='numOfGuests' func={setNumOfGuests} input_type='number' />
                <InputBox name='Number of Beds' id='numOfBeds' func={setNumOfBeds} input_type='number' />
                <InputBox name='Property Type' id='propertyType' func={setPropertyType} input_type='text' />

                <div className="columns">
                    <div className="column is-2 "></div>
                    <div className="column is-2">
                        <strong>Images:</strong>
                    </div>
                    <div className="column is-block mb-2">
                        <input type="file" id="images" multiple/>
                    </div>
                    <div className="column is-2"></div>
                </div>

                <div className="hero is-small">
                    <div className="hero-body">

                    </div>
                </div>


                <div className="columns">
                    <div className="column is-2 "></div>
                    <div className="column">
                        <span>
                            <input className="button is-link" type="register" value="Go back" id="propertyCreate" onClick={() => navigate(-1)} readOnly/>
                        </span>

                    </div>

                    <div className="column">
                        <span>
                            <button className="button is-link" type="register" value="Create new property" id="propertyCreate" onClick={() => property_info(propertyName, 
                            city, country, address, numOfGuests, numOfBeds, propertyType)} readOnly>
                                Create new property
                            </button>
                        </span>

                    </div>
                    <div className="column is-2 "></div>
                </div>

                
                    
                <div className="columns">
                        <div className="column"></div>
                        <div className="column block has-text-centered">
                            <h1 className="is-block mb-2" style={{fontSize: "25px"}} id="notification"> </h1>
                        </div>
                        <div className="column"></div>
                    </div>
                </div>
            </>


}



export default CreatePropertyForm
export {property_info}

{/* <>
        <div className="container">
            <div className="hero is-small">
                <div className="hero-body">

                </div>
            </div>
            <div className="columns is-justify-content-center">
                <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullh">
                    <form className="box p-5">

                        <SignUpInput input_lable_value="Property Name"  input_value={propertyName} update={setPropertyName} placeholder_value="Name of the property" type_value="text"/>

                        <SignUpInput input_lable_value="City"  input_value={city} update={setCity} placeholder_value="City of the property" type_value="text"/>

                        <SignUpInput input_lable_value="Country"  input_value={country} update={setCountry} placeholder_value="Country of the property" type_value="text"/>

                        <SignUpInput input_lable_value="Address"  input_value={address} update={setAddress} placeholder_value="Address of the property" type_value="text"/>

                        <SignUpInput input_lable_value="Number of Guests"  input_value={numOfGuests} update={setNumOfGuests} placeholder_value="Number of Guests" type_value="number"/>

                        <SignUpInput input_lable_value="Number of Beds"  input_value={numOfBeds} update={setNumOfBeds} placeholder_value="Number of Beds" type_value="number"/>

                        <SignUpInput input_lable_value="Property Type"  input_value={propertyType} update={setPropertyType} placeholder_value="Property Type" type_value="text" />

                        <input className="button" type="file" id="images" multiple />

                        <text className="is-block mb-2"> </text>


                        <input className="button is-link" type="register" value="Go back" id="propertyCreate" onClick={() => navigate(-1)} readOnly/>
                        <span>
                            <button className="button is-link" type="register" value="Create new property" id="propertyCreate" onClick={() => property_info(propertyName, 
                            city, country, address, numOfGuests, numOfBeds, propertyType)} readOnly>
                                Create new property
                            </button>
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

            
            <div className="columns">
                <div className="column"></div>
                <div className="column block has-text-centered">
                    <h1 className="is-block mb-2" style={{fontSize: "25px"}} id="notification"> </h1>
                </div>
                <div className="column"></div>
            </div>
        </div>
    
    </> */}