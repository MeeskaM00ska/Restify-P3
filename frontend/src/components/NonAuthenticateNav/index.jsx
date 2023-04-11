import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

const NonAuthenticateNav = () => {

    return(<>

        <nav className="navbar is-link is-hidden-mobile" role="navigation" aria-label="main navigation">
            <div className="navbar-brand is-hidden-tablet">

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">

                    <a className="navbar-item" href="main_page_logged_out.html">
                        Home
                    </a>

                    <a className="navbar-item" href="login.html">
                        Property
                    </a>

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
    <Outlet/>
    </>
    )

}

export default NonAuthenticateNav