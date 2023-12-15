import { Link, useNavigate } from "react-router-dom";
import { defaultToast } from "../utils/Toast";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("isLoggedIn");
        defaultToast("Logout Successfully!")
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top top-0" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Employee Management System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>

                        {
                            localStorage.getItem("isLoggedIn")
                                ? <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                                : <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Signup</Link>
                                    </li>
                                </>
                        }

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;