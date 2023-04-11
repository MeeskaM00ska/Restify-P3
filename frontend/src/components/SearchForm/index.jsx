import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../images/Restify.jpg";


const SearchForm = () => {
    // create a state for query
    const [query, setQuery] = useState({ search: "", page_num: 1 });

    // create a state for properties
    const [properties, setProperties] = useState([]);

    // fetch the properties from the backend
    useEffect(() => {
        const { search, page_num } = query;
        fetch(`http://localhost:8000/property/list/?search=${search}&page=${page_num}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProperties(data);
        });
    }, [query]);

    return (
        <>
                <section className="hero is-small">
                    <div className="hero-body has-text-centered">
                        <div className="container">
                            <img src={logo} alt="Restify" />
                        </div>
                    </div>
                </section>

                <section className="hero is-small">
                <div className="hero-body has-text-centered">
                    <div className="container">

                        <div className="columns">
                            <div className="column"></div>

                            <div className="column is-three-fifths-desktop is-full-mobile is-three-fifths-tablet">
                                <input type="text" className="input"
                                    placeholder="Search for a property"
                                    value={query.search}
                                    onChange={(e) => setQuery({search: e.target.value})}
                                />
                            </div>

                            <div className="column"></div>
                        </div>

                    </div>

                </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column"></div>

                            <div className="column is-one-quarter box">
                                <a href="view-properties.html">
                                    <figure className="image is-5by4">
                                        <img src="images/1.jpg" alt="ppic" />
                                    </figure>
                                </a>

                                <div>
                                    <div>
                                        Toronto, Canada
                                    </div>
                                    <div>
                                        Forest
                                    </div>
                                    <div>
                                        Feb. 21-27
                                    </div>
                                    <div>
                                        999 CAD / night
                                    </div>
                                </div>
                            </div>

                            <div className="column is-one-quarter box">
                                <a>
                                    <figure className="image is-5by4">
                                        <img src="3-1.webp" alt="ppic" />
                                    </figure>
                                </a>

                                <div>
                                    <div>
                                        Bowmanville, Canada
                                    </div>
                                    <div>
                                        Beach and lake views
                                    </div>
                                    <div>
                                        Feb. 12-17
                                    </div>
                                    <div>
                                        389 CAD / night
                                    </div>
                                </div>
                            </div>
                            <div className="column is-one-quarter box">
                                <figure className="image is-5by4">
                                    <img src="4-1.webp" alt="ppic" />
                                </figure>

                                <div>
                                    <div>
                                        New York, New York, US
                                    </div>
                                    <div>
                                        Views
                                    </div>
                                    <div>
                                        Feb. 16-21
                                    </div>
                                    <div>
                                        1,132 CAD / night
                                    </div>
                                </div>
                            </div>

                            <div className="column">

                            </div>
                        </div>

                    </div>

                </section>
        <Outlet />
        </>
    );
}

export default SearchForm;
