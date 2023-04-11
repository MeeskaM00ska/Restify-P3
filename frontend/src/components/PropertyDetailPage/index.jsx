import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyDetail = (props) => {
    // console.log('props');
    // console.log(props);
    // console.log(localStorage.getItem('property_id'));

    const property_id = localStorage.getItem('property_id');

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

    useEffect(() => {
        fetch(`http://localhost:8000/property/detail/${property_id}/`)
            .then((res) => res.json())
            .then(data => {
                setProperty(data.results[0]);
            });
    }, [property_id]);

    return (
        <>
        <div className="hero is-small">
            <div className="hero-body">

            </div>
        </div>

        <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <h1 className="is-size-5-mobile is-size-3-desktop title block"> {property.property_name} </h1>

                            <div className="columns">
                                <div className="column">
                                <strong>Host:</strong> {property["host name"]}
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                <strong>Phone:</strong> {property["host phone"]}
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                <strong>Email: </strong> 
                                <a href={`mailto:${property["host email"]}?subject=About House1&body=I want to ask you information about House1:`}>
                                    {property["host email"]}
                                </a>
                                </div>
                            </div>

                            <a href="book-property.html" className="button is-info is-rounded block">Book now!</a>
                            <h2 className="is-size-5-mobile is-size-3-desktop subtitle"> $Price: {property.lowest_avail_price} CAD / day</h2>
                        </div>
                        <div className="column box">
                            <h1 className="is-size-5-mobile is-size-3-desktop title"> Information</h1>
                                <h3 className="is-size-12-mobile is-size-10-desktop media-content"></h3>
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
        </section>

        <div className="tabs is-centered">
            <ul>
            </ul>
        </div>

        <section className="section">
            <div className="container">
                <div className="columns">

                    <div className="column">
                        <figure className="image is-5by4">
                            <img src={"http://127.0.0.1:8000/" + property.images[0]}  className="is-rounded" style={{objectFit: "cover"}}  />
                        </figure>
                    </div>
                    <div className="column">
                        {
                            property.images[1]? 

                            <figure className="image is-5by4">
                                <img src={"http://127.0.0.1:8000/" + property.images[1]} alt="house pic 2" className="is-rounded" style={{objectFit: "cover"}}  />
                            </figure>

                            :

                            <></>
                        }
                    </div>
                    <div className="column">
                        {
                            property.images[2]? 

                            <figure className="image is-5by4">
                                <img src={"http://127.0.0.1:8000/" + property.images[2]} alt="house pic 2" className="is-rounded" style={{objectFit: "cover"}}  />
                            </figure>

                            :

                            <></>
                        }
                    </div>
                </div>
            </div>
        </section>

        <div className="tabs is-centered">
            <ul>
            </ul>
        </div>
            
            {/* <section class="section">
                <div class="container box">
                    <article class="media">
                        <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="../images/Restify.jpg" class="is-rounded">
                        </p>
                        </figure>
                        <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>John Smith</strong> <small>Rating: 4/5</small>
                            <br>
                                Good house!
                            <small> <a href="comment-properties.html">Reply</a>
                            </p>
                        </div>
                        </div>
                    </article>
                </div>
            </section>

            <section class="section">
                <div class="container box">
                    <article class="media">
                        <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="../images/Restify.jpg" class="is-rounded">
                        </p>
                        </figure>
                        <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>Post new comment</strong>
                            <br>
                            <a  href="new-comment.html">
                                <button class="button">Make a new comment</button>
                            </a>
                            </p>
                        </div>
                        </div>
                    </article>
                </div>
            </section> */}
        
        </>
    );
}

export default PropertyDetail;
