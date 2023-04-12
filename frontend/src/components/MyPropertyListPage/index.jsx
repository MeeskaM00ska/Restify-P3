import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayProperty from "../PropertyCard";

const MyPropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [userID, setUserID] = useState(-1);
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);

    const [query, setQuery] = useState({page_num: 1});
    const [numOfPages, setNumOfPages] = useState(1);

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
            fetch(`http://localhost:8000/property/list/?owner=${userID}&page=${query.page_num}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setProperties(data.properties);
                setNumOfPages(data.total_pages);
            }
            );
        });
    }, [userID, query]);


    // console.log(properties);
    const displayProperties = properties.map((property) => {
        // console.log("A");
        // console.log(property);
        return DisplayProperty(property);
    });

    return (
        <>

            <div className="hero">
                <div className="hero-body">
                    <div className="columns">
                        <div className="column is-1"></div>
                        <div className="column">
                            <h1 className="is-size-3-mobile is-size-3-desktop title">My Properties</h1>
                            <Link to="/authenticated/property/create"
                            className="button">
                                Add a new property
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

            <div className="container">
                {displayProperties}
            </div>

            <div className="hero is-small">
                <div className="hero-body">

                </div>
            </div>
            
            <div className="container has-text-centered">
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

export default MyPropertyList;
