import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPropertyForm from "../PropertyEditForm";

const DisplayProperty = (property) => {

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

                    <div className="media-content">
                        <div className="content">

                            {
                                <>
                                    <div>
                                                
                                        <h1 className="is-size-5-mobile is-size-3-desktop title"> Information</h1>
                                        <strong>Property Name:</strong> {property.property_name}<br/>
                                        <strong>Property Type:</strong> {property.property_type}<br/>
                                        <strong>Address:</strong> {property.address}<br/>
                                        <strong>City:</strong> {property.city}<br/>
                                        <strong>Country:</strong> {property.country}<br/>
                                        <strong>Properties status:</strong> Pending <br/>
                                        <strong>Number of Guests:</strong> {property.num_of_guests} <br/>
                                        <strong>Number of Beds:</strong> {property.num_of_beds} <br/>

                                        <strong>Inner id:</strong> {property.property_id} <br/>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <footer class="card-footer">
                <Link to={`/authenticated/property/detail/${property.property_id}`}
                class="card-footer-item"
                >
                    Detail
                </Link>

                <Link to={`/authenticated/property/${property.property_id}/avail/list`}
                class="card-footer-item">
                    Manage Available Time
                </Link>
                
                <Link to={`/authenticated/property/edit/${property.property_id}`}
                class="card-footer-item"
                >
                    Edit
                </Link>
                
                <Link to={`/authenticated/property/delete/${property.property_id}`}
                class="card-footer-item">
                    Delete
                </Link>
            </footer>
        </div>
        </>
    );
};

export default DisplayProperty;
