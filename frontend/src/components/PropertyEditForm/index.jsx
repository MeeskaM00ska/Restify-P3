import React, { useEffect } from "react";
import SignUpInput from "../SignUpInput";
import { useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const property_info=(property_name, city, country, address, num_of_guests, num_of_beds,
    property_type, property_id)=>{

    var propertyData = new FormData();
    var imagesData = new FormData();

    var notification = document.getElementById('notification');

    notification.innerHTML = "";
    
    //append property data
    // if (document.getElementById('images').files.length !== 0){
    //     var main_pic = document.getElementById('images').files[0];
    //     propertyData.append('main_pic', main_pic);
    // }
    if (property_name !== ""){
        propertyData.append('property_name', property_name);
    }
    if (city !== ""){
        propertyData.append('city', city);
    }
    if (country !== ""){
        propertyData.append('country', country);
    }
    if (address !== ""){
        propertyData.append('address', address);
    }
    if (num_of_guests !== ""){
        propertyData.append('num_of_guests', num_of_guests);
    }
    if (num_of_beds !== ""){
        propertyData.append('num_of_beds', num_of_beds);
    }
    if (property_type !== ""){
        propertyData.append('property_type', property_type);
    }

    // console.log(propertyData._boundary)
    var request = fetch(`http://127.0.0.1:8000/property/edit/${property_id}/`, {
        method: 'PUT',
        body: propertyData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }
    ).then(response => response.json()).catch(error => {console.log(error)})
    .then(console.log("finished"));
    
    notification.innerHTML = "&check; Property updated successfully";
    notification.style.color = "green";
}

const EditPropertyForm = () => {
    const [propertyName, setPropertyName] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [numOfGuests, setNumOfGuests] = useState("")
    const [numOfBeds, setNumOfBeds] = useState("")
    const [propertyType, setPropertyType] = useState("")

    const [property, setProperty] = useState({
        "address": "",
        "city": "",
        "country": "",
        "host email": "",
        "host name": "",
        "host phone": "",
        "host username": '',
        "lowest_avail_price": '',
        'num_of_beds': '',
        'num_of_guests': '',
        'property_id': '',
        'property_type': '',
        'property_name': '',
        'images': []
    });

    const navigate = useNavigate();

    const property_id = useParams()['propertyID'];

    useEffect(() => {
        fetch(`http://localhost:8000/property/detail/${property_id}/`)
            .then((res) => res.json())
            .then(data => {
                setProperty(data.results[0]);
            });
    }, [property_id]);
    
    return <>

        <div className="box has-text-centered">

        <div className="hero is-small">
            <div className="hero-body">

            </div>
        </div>
            <div className="columns">
            <div className="column is-2 "></div>
                <h1 className="is-size-5-mobile is-size-3-desktop title"> Editing information </h1>

                <div className="column is-2 "></div>
            </div>

        <div className="hero is-small">
            <div className="hero-body">

            </div>
        </div>

        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>Property name:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type="text" id="propertyName"
                defaultValue={property.property_name}
                onChange={(e) => setPropertyName(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2"></div>
        </div>

        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>Property type:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type="text" id="propertyName"
                defaultValue={property.property_type}
                onChange={(e) => setPropertyType(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2 "></div>
        </div>

        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>Address:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type="text" id="address"
                defaultValue={property.address}
                onChange={(e) => setAddress(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2 "></div>
        </div>

        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>City:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type="text" id="city"
                defaultValue={property.city}
                onChange={(e) => setCity(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2 "></div>
        </div>

        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>Country:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type="text" id="country"
                defaultValue={property.country}
                onChange={(e) => setCountry(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2 "></div>
        </div>

        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>Number of guests:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type="text" id="numOfGuests"
                defaultValue={property.num_of_guests}
                onChange={(e) => setNumOfGuests(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2 "></div>
        </div>

        <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>Number of guests:</strong>
            </div>
            <div className="column is-block mb-2">
                <input type="text" id="numOfBeds"
                defaultValue={property.num_of_beds}
                onChange={(e) => setNumOfBeds(e.target.value)}
                className="input"
                />
            </div>
            <div className="column is-2 "></div>
        </div>

        {/* <div className="columns">
            <div className="column is-2 "></div>
            <div className="column is-2">
                <strong>Images:</strong>
            </div>
            <div className="column is-block mb-2">
                <input className="button" type="file" id="images" multiple />
            </div>
            <div className="column is-2 "></div>
        </div> */}

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
                    <input className="button is-link" type="register" value="Apply edit" id="propertyCreate" onClick={() => property_info(propertyName, 
                    city, country, address, numOfGuests, numOfBeds, propertyType, property_id)} readOnly/>
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

export default EditPropertyForm
