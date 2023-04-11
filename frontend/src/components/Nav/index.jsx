import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const NonAuthenticateNav = () => {
    // const [toLog, setToLog] = useState(<></>);
    
    // useEffect(() => {
    //     const curr_token = localStorage.getItem("token");

    //     if (curr_token) {
    //         localStorage.removeItem("token");
    //         setToLog(
                // <>
                //     <div className="navbar-item">
                //         <p>
                //             Have an account?
                //         </p>
                //     </div>
                //     <div className="navbar-item">
        
                //         <div className="buttons">
                //             <Link to="/login" className="button is-light" >
                //                 Log in
                //             </Link>
                //         </div>
        
                //     </div>
    //             </>
    //         );
    //     } else {
    //         setToLog(
            
    //             <div className="navbar-item">
        
    //                 <div className="buttons">
    //                     <Link to="/logout" className="button is-light" >
    //                         Log out
    //                     </Link>
    //                 </div>
    
    //             </div>
    //         );
    //     }
    // }, [localStorage.getItem("token")]);


    return(<>

        <nav className="navbar is-link is-hidden-mobile " role="navigation" aria-label="main navigation">
            <div className="navbar-brand is-hidden-tablet">

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">

                    
                    <Link to="/property/list" className="navbar-item">
                        Home
                    </Link>

                    <Link to="/login" className="navbar-item">
                        My properties
                    </Link>

                    <a className="navbar-item" href="login.html">
                        Order
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                        More
                        </a>

                        <div className="navbar-dropdown">
                        <a className="navbar-item">
                            About us
                        </a>
                        <a className="navbar-item">
                            Register a property
                        </a>
                        <a className="navbar-item">
                            Contact
                        </a>
                        <a className="navbar-item">
                            Report an issue
                        </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <p>
                            Have an account?
                        </p>
                    </div>
                    <div className="navbar-item">
        
                        <div className="buttons">
                            <Link to="/login" className="button is-light" >
                                Log in
                            </Link>
                        </div>
        
                    </div>
                </div>
            </div>
        </nav>

        <nav className="navbar is-link is-hidden-desktop is-hidden-tablet" role="navigation" aria-label="main navigation">
        </nav>

        <nav class="navbar is-link is-fixed-bottom is-hidden-desktop">
            <div class="navbar-brand">
                <div class="navbar-item">

                    <div class="buttons ml-auto mr-auto">

                        <Link class="button is-link" to="/property/list">
                            Home
                        </Link>
                        <Link to="/login" className="button is-link" >
                            Log in
                        </Link>
                        <Link to="/login" className="button is-link" >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    <Outlet/>
    </>
    )

}

export default NonAuthenticateNav