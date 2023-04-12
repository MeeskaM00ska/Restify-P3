import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import AvailCard from "../AvailCard";

const AvailList = () => {

    const [avails, setAvails] = useState([]);

    var property_id = useParams()['propertyID'];

    useEffect(() => {
        fetch(`http://localhost:8000/property/${property_id}/avail/list/`)
            .then(response => response.json())
            .then(data => {
                console.log(data.avails);
                setAvails(data.avails);
            })
    }, [property_id]);

    const displayAvails = avails.map((avail) => {
            return AvailCard(avail);
    });


    return (
        <>

            <div className="hero">
                <div className="hero-body">
                    <div className="columns">
                        <div className="column is-1"></div>
                        <div className="column">
                            <h1 className="is-size-3-mobile is-size-3-desktop title">All Available dates</h1>
                            <Link to={`/authenticated/property/${property_id}/avail/add`}
                            className="button">
                                Add a new available date
                            </Link>
                        </div>
                        <div className="column is-1"></div>
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="column is-2">

                </div>

                <div className="column">
                    <div className="card">
                        <div className="card-content">
                            <div className="columns">
                                <div className="column is-1">

                                </div>

                                <div className="column">

                                    <ol>
                                        {displayAvails}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="column is-2">

                </div>
            </div>
        </>
    );

};

export default AvailList;