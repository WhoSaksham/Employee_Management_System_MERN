import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultToast, errorToast } from "../utils/Toast";

const Signup = () => {
    const [userData, setUserData] = useState({ fullName: "", email: "", password: "" });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const { fullName, email, password } = userData;
        if (fullName.length > 1 && email.length > 1 && password.length > 1) {
            try {
                const result = await fetch("http://localhost:8000/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fullName, email, password })
                });

                const resp = await result.json();

                if (resp.success) {
                    defaultToast(`Welcome, ${resp.response.fullName}`);
                    localStorage.setItem("isLoggedIn", true);
                    sessionStorage.setItem("access_token", resp.token);
                    navigate('/');
                }
                else errorToast(`Signup failed, ${resp.message}`);
            } catch (error) {
                errorToast(`Signup failed`);
            }
        } else {
            errorToast("Please fill all fields")
        }
    }

    return (
        <div className="container">
            <div className="text-center my-5">
                <h1 className="mt-5">Welcome</h1>
                <h2 className="text-warning fst-italic">Signup to continue</h2>
            </div>
            <div className="form text-center">
                <form className="d-flex flex-column">
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="text"
                        placeholder="Enter Full Name"
                        value={userData.fullName}
                        required={true}
                        onChange={e => setUserData({ ...userData, fullName: e.target.value })}
                    />
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
                        onClick={handleSignup}
                        className="btn btn-success my-3 w-25 mx-auto">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;