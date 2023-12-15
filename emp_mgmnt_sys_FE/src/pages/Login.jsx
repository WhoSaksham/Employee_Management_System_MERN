import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultToast, errorToast } from "../utils/Toast";

const Login = () => {

    const [userData, setUserData] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) navigate('/');
        // eslint-disable-next-line
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = userData;
        if (email.length > 1 && password.length > 1) {
            try {
                const result = await fetch("http://localhost:8000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const resp = await result.json();

                // const token = result.headers.get("Access_token");

                if (resp.success) {
                    defaultToast(`Welcome back, ${resp.response.fullName}`);
                    localStorage.setItem("isLoggedIn", true);
                    sessionStorage.setItem("access_token", resp.token);
                    navigate('/');
                }
                else errorToast(`Login failed, ${resp.message}`);
            } catch (error) {
                errorToast(`Login failed`);
            }
        } else {
            errorToast("Please fill all fields")
        }
    }

    return (
        <div className="container">
            <div className="text-center my-5">
                <h1 className="mt-5">Welcome Back</h1>
                <h2 className="text-success fst-italic">Login to continue</h2>
            </div>
            <div className="form text-center">
                <form className="d-flex flex-column">
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="email"
                        placeholder="Enter Email"
                        value={userData.email}
                        required={true}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                    />
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="password"
                        placeholder="Enter Password"
                        value={userData.password}
                        required={true}
                        minLength={8}
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                    />
                    <button
                        type="submit"
                        // onClick={getData}
                        onClick={handleLogin}
                        className="btn btn-success my-3 w-25 mx-auto p-2">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;