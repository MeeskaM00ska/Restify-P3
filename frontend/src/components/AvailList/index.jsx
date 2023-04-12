import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import AvailCard from "../AvailCard";

const AvailList = () => {

    const [avails, setAvails] = useState([]);
    const [hasAvail, setHasAvail] = useState(false);

    const [query, setQuery] = useState({page_num: 1});
    const [numOfPages, setNumOfPages] = useState(1);

    var property_id = useParams()['propertyID'];

    useEffect(() => {
        fetch(`http://localhost:8000/property/${property_id}/avail/list/?page=${query.page_num}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.avails);
                setAvails(data.avails);
                setHasAvail(data.avails.length > 0);
                setNumOfPages(data.total_pages);
            })
    }, [property_id, query]);

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
            
        <div className="container has-text-centered is-hidden-mobile">
                    <div className="columns">
                            <div className="column is-one-third">

                            </div>

                            {
                                query.page_num > 1 ?
                                <div className="column">
                                <button className="button is-link" onClick={() => setQuery({...query, page_num: query.page_num - 1})}> Previous </button>
                                </div>
                                :
                                <div className="column">
                                <button className="button is-link is-hidden" > Previous </button>
                                </div>
                            }

                            <div className="column subtitle">
                                Page {query.page_num} of {numOfPages}
                            </div>
                        
                            {
                                query.page_num < numOfPages ?
                                <div className="column">
                                    <button className="button is-link" onClick={() => setQuery({...query, page_num: query.page_num + 1})}> Next </button>
                                </div>
                                :
                                <div className="column">
                                    <button className="button is-link is-hidden" > Next </button>
                                </div>
                            }
                            
                            <div className="column is-one-third">

                            </div>
                    </div>
        </div>

            <div className="columns">
                <div className="column is-2">

                </div>

                <div className="column">
                    <div className="card">
                    {
                        hasAvail 
                        ?
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
                        :
                        <>
                        <div className="columns">
                            <div className="column is-1">

                            </div>
                            <div className="column">
                                This property has no available dates.
                            </div>
                        </div>
                        </>
                    }

                    </div>
                </div>

                <div className="column is-2">

                </div>
            </div>

            
        <div className="container has-text-centered is-hidden-mobile">
                    <div className="columns">
                            <div className="column is-one-third">

                            </div>

                            {
                                query.page_num > 1 ?
                                <div className="column">
                                <button className="button is-link" onClick={() => setQuery({...query, page_num: query.page_num - 1})}> Previous </button>
                                </div>
                                :
                                <div className="column">
                                <button className="button is-link is-hidden" > Previous </button>
                                </div>
                            }

                            <div className="column subtitle">
                                Page {query.page_num} of {numOfPages}
                            </div>
                        
                            {
                                query.page_num < numOfPages ?
                                <div className="column">
                                    <button className="button is-link" onClick={() => setQuery({...query, page_num: query.page_num + 1})}> Next </button>
                                </div>
                                :
                                <div className="column">
                                    <button className="button is-link is-hidden" > Next </button>
                                </div>
                            }
                            
                            <div className="column is-one-third">

                            </div>
                    </div>
        </div>
        </>
    );

};

export default AvailList;