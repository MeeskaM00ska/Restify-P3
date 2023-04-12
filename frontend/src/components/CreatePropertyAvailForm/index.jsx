import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import InputBox from "../GeneralInputBox";

const avail_info = (start_date, end_date, price, property_id) => {
    var availData = new FormData();
    var notification = document.getElementById('notification');

    notification.innerHTML = "";

    if (start_date === "" || end_date === "" || price === ""){
        notification.innerHTML = "Please fill in all fields";
        return;
    }

    availData.append('start_date', start_date);
    availData.append('end_date', end_date);
    availData.append('price', price);

    var request = fetch(`http://localhost:8000/property/${property_id}/avail/add/`, {
        method: 'POST',
        body: availData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(response => response.json()).catch(error => { console.log(error) })
    
    notification.innerHTML = "&check; Property updated successfully";
    notification.style.color = "green";
}

const AddAvail = () => {
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [price, setPrice] = useState("");

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
                <h1 className="is-size-5-mobile is-size-3-desktop title"> Adding available time for property {property.property_name} </h1>

                <div className="column is-2 "></div>
            </div>

        <div className="hero is-small">
            <div className="hero-body">

            </div>
        </div>

        <InputBox name='Start Date' id='startDate' func={setStartDate} input_type='date' />
        <InputBox name='End Date' id='endDate' func={setEndDate} input_type='date' />
        <InputBox name='Price per Day' id='price' func={setPrice} input_type='number' />

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
                    <input className="button is-link" type="register" value="Add availability" id="propertyCreate" onClick={() => avail_info(
                        start_date, end_date, price, property_id)} readOnly/>
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

export default AddAvail;
