import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const displayProperty = (property) => {
    return (
        <>
        <div className="hero is-small">
            <div className="hero-body">

            </div>
        </div>

        <div className="card">

            <div className="card-image is-5by4">
                <figure class="image">
                    <img src={"http://127.0.0.1:8000/" + property.main_pic} alt="Placeholder image" style={{width: "90rem", height: "25rem", objectFit: "cover"}}/>
                </figure>
            </div>

            <div className="card-content">

                <div className="media">

                    <div className="media-left">
                        <div className="content">
                            <div>
                                
                                <h1 className="is-size-5-mobile is-size-3-desktop title"> Information</h1>
                                <strong>Property Type:</strong> {property.property_type}<br/>
                                <strong>Address:</strong> {property.address}<br/>
                                <strong>City:</strong> {property.city}<br/>
                                <strong>Country:</strong> {property.country}<br/>
                                <strong>Properties status:</strong> Pending <br/>
                                <strong>Number of Guests:</strong> {property.num_of_guests} <br/>
                                <strong>Number of Beds:</strong> {property.num_of_beds} <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="card-footer">
                <Link to="/authenticated/property/detail" 
                onClick={() => {
                    localStorage.setItem('propertyID', property.id);
                }}
                class="card-footer-item"
                >
                    Detail
                </Link>
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
        </div>
        </>
    );
};

const MyPropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [userID, setUserID] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        
        // get the user id
		fetch("http://127.0.0.1:8000/accounts/info/",{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setUserID(data.id);
        }
        ).then(() => {
            if (userID === -1) {
                return ;
            }

            // get the properties that belong to the user
            fetch("http://localhost:8000/property/list/?owner=" + userID, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setProperties(data.properties);
            }
            );
        });
    }, [userID]);


    console.log(properties);
    const displayProperties = properties.map((property) => {
        console.log("A");
        console.log(property);
        return displayProperty(property);
    });

    return (
        <>
        <dir className="hero is-small">
            <dir classNamehero-body>

            </dir>
        </dir>
            <div className="hero">
                <div className="hero-body">
                    <h1 className="is-size-3-mobile is-size-3-desktop title">My Properties</h1>
                </div>
            </div>
            <div className="container">
                {displayProperties}
            </div>
        </>
    );
};

export default MyPropertyList;
