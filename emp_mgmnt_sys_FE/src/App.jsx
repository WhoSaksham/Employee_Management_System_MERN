import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;