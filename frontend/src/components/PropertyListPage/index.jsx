import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../images/Restify.jpg";
import { useNavigate } from "react-router-dom";

const displayRow = (row, index) => {
    
    return (
        <div className="column is-one-quarter box">
            <Link 
                to={`/authenticated/property/detail/${row?.[index].property_id}`}
            >
                <figure className="image is-5by4">
                    <img src={"http://127.0.0.1:8000/" + row?.[index].main_pic} alt="p_pic" style={{objectFit: "cover"}} />
                </figure>
            </Link>

            <div>
                <div>
                    {row?.[index].city}, {row[0].country}
                </div>
                <div>
                    {row?.[index].property_type}
                </div>
                <div>
                    {row?.[index].num_of_guests} guests
                </div>
                <div>
                    {row?.[index].lowest_avail_price}
                </div>
            </div>
        </div>
    );
}


const SearchForm = () => {
    // create a state for query
    const [query, setQuery] = useState({ search: "", page_num: 1,
        city: "", country: "", num_of_guests: "", num_of_beds: "", property_type: "", ordering: ""});

    // create a state for properties
    const [properties, setProperties] = useState([]);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [numOfPages, setNumOfPages] = useState(1);

    const nav = useNavigate();

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {

            nav("/authenticated/property/list")
        }else{
            nav("/property/list")
        }
    
        }, []);

    // fetch the properties from the backend
    useEffect(() => {
        const { 
            search, page_num,
            city, country, num_of_guests, num_of_beds, property_type,
            ordering
        } = query;
        fetch(`http://localhost:8000/property/list/?city=${city}&country=${country}&num_of_guests=${num_of_guests}&num_of_beds=${num_of_beds}&property_type=${property_type}&search=${search}&page=${page_num}&ordering=${ordering}`)
        .then(response => response.json())
        .then(data => {
            setProperties(data.properties);
            setNumOfPages(data.total_pages);
        });
    }, [query]);

    // make every three properties into a row
    const rows = [];
    console.log(properties);
    for (let i = 0; i < properties.length; i += 3) {
        rows.push(properties.slice(i, i + 3));
    }

    const displayProperties = rows.map((row, index) => {

        var card_a = <div className="column is-one-quarter box is-hidden"> </div>;
        var card_b = <div className="column is-one-quarter box is-hidden"> </div>;
        var card_c = <div className="column is-one-quarter box is-hidden"> </div>;

        if (row?.[0]) {
            card_a = (
                displayRow(row, 0)
            );
        }

        if (row?.[1]) {
            card_b = (<>
                    
                <div className="column">
    
                </div> 

                {
                displayRow(row, 1)
                }
            </>
            );
        }

        if (row?.[2]) {
            card_c = (<>
                    
                <div className="column">
    
                </div> 

                {
                displayRow(row, 2)
                }
            </>

            );
        }


                
        return (
            <>

            <div className="columns">
                
                    <div className="column">
        
                    </div>

                    {card_a}

                    {card_b}
                    
                    {card_c}
                    
                    <div className="column">
    
                    </div>
            </div>
            </>
        );
    });

    return (
        <>  

                <section className="hero is-small">
                    <div className="hero-body has-text-centered">
                        <div className="container">
                            <text style={{fontSize: 100 + 'px', fontFamily: "fantasy", color: "purple"}} > Restify </text>
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
                                    onChange={(e) => setQuery({...query, search: e.target.value, page_num: 1})}
                                />
                            </div>

                            <div className="column"></div>
                        </div>

                        
                        <div className="container block">

                            <div className="columns">
                                <div className="column is-one-fifth is-hidden-mobile"></div>

                                <div className="column is-one-fifth is-full-mobile is-one-fifth-tablet">
                                    <div className="field has-addons">

                                        <div className="control">
                                        <button className="button is-link" onClick={toggleFilters}>
                                            {filtersVisible ? "Hide Filters" : "Show Filters"}
                                        </button>
                                        </div>

                                    </div>
                                </div>

                                <div className="column is-hidden-mobile"></div>

                                <div className="column ">

                                </div>

                                <div className="column is-one-fifth is-hidden-mobile"></div>
                            </div>

                            {

                                filtersVisible &&
                                    
                                <>
                                    <div className="columns">

                                        <div className="column is-one-fifth is-hidden-mobile"></div>

                                        <div className="column is-four-fifths-mobile">
                                            <input type="text" className="input"
                                            placeholder="City"
                                            onChange={(e) => setQuery({...query, city: e.target.value, page_num: 1})}
                                            />
                                        </div>

                                        <div className="column is-four-fifths-mobile">
                                            <input type="text" className="input"
                                            placeholder="Country"
                                            onChange={(e) => setQuery({...query, country: e.target.value, page_num: 1})}
                                            />
                                        </div>

                                        <div className="column is-one-third is-hidden-mobile"></div>

                                    </div>
                                    <div className="columns">

                                        <div className="column is-one-fifth is-hidden-mobile"></div>
                                        
                                        <div className="column is-four-fifths-mobile">
                                            <div className="field is-grouped">
                                                <input type="number" className="input"
                                                placeholder="Guests"
                                                onChange={(e) => setQuery({...query, num_of_guests: e.target.value, page_num: 1})}
                                                min={1}
                                                />
                                                
                                                <p className=" is-hidden-desktop is-hidden-tablet">&nbsp;</p>

                                                <input type="number" className="input is-hidden-desktop is-hidden-tablet"
                                                placeholder="Beds"
                                                onChange={(e) => setQuery({...query, num_of_beds: e.target.value, page_num: 1})}
                                                min={1}
                                                />
                                            </div>
                                        </div>

                                        <div className="column is-hidden-mobile">
                                            <input type="number" className="input"
                                            placeholder="Beds"
                                            onChange={(e) => setQuery({...query, num_of_beds: e.target.value, page_num: 1})}
                                            min={1}
                                            />
                                        </div>

                                        <div className="column">

                                            <p>Type:</p>
                                        </div>

                                        <div className="column is-four-fifths-mobile field is-grouped">
                                            <div className="select is-link">

                                                <select
                                                    onChange={
                                                        (e) => {
                                                            console.log(e.target.value);
                                                            var chosen = e.target.value;
                                                            if (chosen === "Any"){
                                                                setQuery({...query, property_type: (""), page_num: 1});
                                                            }
                                                            else if (chosen === "House"){
                                                                setQuery({...query, property_type: ("House"), page_num: 1});
                                                            }
                                                            else if (chosen === "Apartment"){
                                                                setQuery({...query, property_type: ("Apartment"), page_num: 1});
                                                            }
                                                            else if (chosen === "Castle"){
                                                                setQuery({...query, property_type: ("Castle"), page_num: 1});
                                                            }
                                                        }
                                                }>
                                                    <option>Any</option>
                                                    <option>House</option>
                                                    <option>Apartment</option>
                                                    <option>Castle</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="column is-one-third is-hidden-mobile"></div>

                                    </div>

                                    
                                    <div className="columns">

                                        <div className="column is-one-fifth is-hidden-mobile"></div>
                                        <div className="column ">
                                            Order by:
                                        </div>
                                        <div className="column">
                                                <div className="select is-link">
                                                    <select
                                                        onChange={
                                                            (e) => {
                                                                console.log(e.target.value);
                                                                if (e.target.value === "Default"){
                                                                    setQuery({...query, ordering: (query.ordering[0] === "-" ? "-" : "") +  "", page_num: 1});
                                                                }
                                                                else if (e.target.value === "Price"){
                                                                    setQuery({...query, ordering: (query.ordering[0] === "-" ? "-" : "") +  "lowest_avail_price", page_num: 1});
                                                                }
                                                                else if (e.target.value === "Number of Guests"){
                                                                    setQuery({...query, ordering: (query.ordering[0] === "-" ? "-" : "") + "num_of_guests", page_num: 1});
                                                                }
                                                                else if (e.target.value === "Number of Beds"){
                                                                    setQuery({...query, ordering: (query.ordering[0] === "-" ? "-" : "") +  "num_of_beds", page_num: 1});
                                                                }
                                                            }
                                                    }>
                                                        <option>Default</option>
                                                        <option>Price</option>
                                                        <option>Number of Guests</option>
                                                        <option>Number of Beds</option>
                                                    </select>
                                                </div>
                                        </div>
                                        <div className="column">
                                                <div className="select is-link">
                                                    <select
                                                        onChange={
                                                            (e) => {
                                                                if (e.target.value === "Ascending"){
                                                                    if (query.ordering[0] === "-"){
                                                                        setQuery({...query, ordering: query.ordering.slice(1), page_num: 1});
                                                                    }
                                                                }
                                                                else if (e.target.value === "Descending"){
                                                                    setQuery({...query, ordering: "-" + query.ordering, page_num: 1});
                                                                }
                                                            }
                                                        }
                                                    >
                                                        <option>Ascending</option>
                                                        <option>Descending</option>
                                                    </select>
                                                </div>
                                        </div>

                                        <div className="column is-two-fifths is-hidden-mobile"></div>
                                    </div>
                                </>
                            }

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
                            
                            {displayProperties}

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

                </section>
        <Outlet />
        </>
    );
}

export default SearchForm;
