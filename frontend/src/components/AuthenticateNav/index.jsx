import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const NonAuthenticateNav = () => {
    const nav = useNavigate()

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

                    <Link to="/authenticated/my/property/list" className="navbar-item">
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
                        <Link to="/authenticated/user_info" className="button is-primary" >
                            Peroson Profile
                        </Link>
                    </div>

                    <div className="navbar-item">

                        <div className="buttons">
                            <button className="button is-light" onClick={
                                () => { 
                                    localStorage.removeItem("token")
                                    nav("/login")
                                }
                            } >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>

        <nav className="navbar is-link is-hidden-desktop is-hidden-tablet" role="navigation" aria-label="main navigation">
        </nav>


        <div className="navbar is-link is-fixed-bottom is-hidden-desktop has-text-centered">
                <Link class="button is-link" to="/property/list">
                    Home
                </Link>
                <Link class="button is-link" to="/authenticated/my/property/list">
                    My properties
                </Link>
                <Link class="button is-link" href="Reservation_main.html">
                    Order
                </Link>
                <Link class="button is-link" href="personal_info.html">
                    Profile
                </Link>
                <Link className="button is-link is-primary" onFocus={
                                () => { 
                                    localStorage.removeItem("token")
                                    nav("/login")
                                }
                            } >
                                Logout
                </Link>
        </div>
    <Outlet/>
    </>
    )

}

export default NonAuthenticateNav