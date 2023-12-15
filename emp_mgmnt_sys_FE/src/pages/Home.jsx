import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { defaultToast, errorToast } from "../utils/Toast";
import AllEmployees from "../components/AllEmployees";

const Home = () => {
    const ref = useRef(null);
    const refClose = useRef(null);

    const [userData, setUserData] = useState({
        name: "", role: "", department: "", experience: "", salary: ""
    });

    const [editUserData, setEditUserData] = useState({
        name: "", role: "", department: "", experience: "", salary: ""
    });

    const [editId, setEditId] = useState("");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("isLoggedIn") || !sessionStorage.getItem("access_token")) navigate('/login');
        else getEmployees();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line
    }, [search, employees]);

    async function getEmployees() {
        try {
            const resp = await fetch("http://localhost:8000/employees", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("access_token")
                }
            })

            const data = await resp.json();

            if (data.success) {
                setEmployees(data.response);
            }
        } catch (error) {
            errorToast("Something went wrong")
        }
    }

    async function handleAdd(e) {
        e.preventDefault();

        const { name, role, department, experience, salary } = userData;

        try {
            if (name.length > 0 && role.length > 0 && department.length > 0 && experience.length > 0 && salary.length > 0) {
                const resp = await fetch("http://localhost:8000/employees", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("access_token")
                    },
                    body: JSON.stringify({
                        name, role, department, experience, salary
                    })
                })

                const data = await resp.json();

                if (data.success) {
                    defaultToast(data.message);
                    getEmployees();
                    setUserData({
                        name: "", role: "", department: "", experience: "", salary: ""
                    })
                }

            } else {
                errorToast("Please fill all fields!")
            }
        } catch (error) {
            errorToast("Something went wrong");
        }
    }

    async function handleEdit(e) {
        e.preventDefault();

        // const { name, role, department, experience, salary } = editUserData;

        try {
            // if (name.length > 0 && role.length > 0 && department.length > 0 && experience.length > 0 && salary.length > 0) {
            const resp = await fetch(`http://localhost:8000/employees/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("access_token")
                },
                body: JSON.stringify(editUserData)
            })

            const data = await resp.json();

            if (data.success) {
                defaultToast(data.message);
                setUserData({
                    name: "", role: "", department: "", experience: "", salary: ""
                });
                setEditId("");
                refClose.current.click();
                getEmployees();
            }

            // } else errorToast("Please fill all fields!");
        } catch (error) {
            errorToast("Something went wrong");
        }
    }

    function updateEmp(id, upadteData) {
        setEditUserData(upadteData);
        setEditId(id);
        ref.current.click();
    }

    async function deleteEmp(id) {
        try {
            const resp = await fetch(`http://localhost:8000/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("access_token")
                }
            })

            const data = await resp.json();

            if (data.success) {
                defaultToast(data.message);
                getEmployees();
            }
        } catch (error) {
            errorToast("Something went wrong")
        }
    }

    function handleSearch() {
        if (search.length > 0) {
            const filteredEmp = employees.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
            setFilteredEmployees(filteredEmp);
        } else {
            setFilteredEmployees([...employees]);
        }
    }

    return (
        <div className="container text-center">
            <div className="my-3">
                <h1>Add a New Employee to WorkCompanion</h1>

                <form className="d-flex flex-column">
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="text"
                        placeholder="Enter Employee Name"
                        value={userData.name}
                        required={true}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                    />
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="text"
                        placeholder="Enter Employee Role"
                        value={userData.role}
                        required={true}
                        onChange={e => setUserData({ ...userData, role: e.target.value })}
                    />
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="text"
                        placeholder="Enter Employee Department"
                        value={userData.department}
                        required={true}
                        onChange={e => setUserData({ ...userData, department: e.target.value })}
                    />
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="number"
                        placeholder="Enter Employee Experience (in Years)"
                        value={userData.experience}
                        required={true}
                        onChange={e => setUserData({ ...userData, experience: e.target.value })}
                    />
                    <input
                        className="my-2 rounded p-2 w-50 mx-auto"
                        type="number"
                        placeholder="Enter Employee Salary (in LPA)"
                        value={userData.salary}
                        required={true}
                        onChange={e => setUserData({ ...userData, salary: e.target.value })}
                    />
                    <button
                        type="submit"
                        onClick={handleAdd}
                        className="btn btn-success my-3 w-25 mx-auto">Add</button>
                </form>
            </div>

            <div className="d-flex justify-content-evenly registered-employees">
                <h1 className="mb-3">Registered Employees of WorkCompanion</h1>

                <form className="d-flex" role="search" style={{ height: "50px" }}>
                    <input className="rounded p-2 me-2 border-black" type="search" placeholder="Type to Search Employees..." onChange={e => setSearch(e.target.value)} />
                </form>
            </div>

            <div className="d-flex flex-wrap all-employees">
                <AllEmployees employees={filteredEmployees} updateEmp={updateEmp} deleteEmp={deleteEmp} />
            </div>

            <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={ref}></button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Employee</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form className="d-flex flex-column">
                                <label htmlFor="eName">Employee Name</label>
                                <input
                                    className="my-2 rounded p-2 w-75 mx-auto"
                                    name="eName"
                                    type="text"
                                    placeholder="Enter Employee Name"
                                    value={editUserData.name}
                                    required={true}
                                    onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
                                />

                                <label htmlFor="eRole">Employee Role</label>
                                <input
                                    className="my-2 rounded p-2 w-75 mx-auto"
                                    type="text"
                                    name="eRole"
                                    placeholder="Enter Employee Role"
                                    value={editUserData.role}
                                    required={true}
                                    onChange={e => setEditUserData({ ...editUserData, role: e.target.value })}
                                />

                                <label htmlFor="eDep">Employee Department</label>
                                <input
                                    className="my-2 rounded p-2 w-75 mx-auto"
                                    type="text"
                                    name="eDep"
                                    placeholder="Enter Employee Department"
                                    value={editUserData.department}
                                    required={true}
                                    onChange={e => setEditUserData({ ...editUserData, department: e.target.value })}
                                />

                                <label htmlFor="eExp">Employee Experience</label>
                                <input
                                    className="my-2 rounded p-2 w-75 mx-auto"
                                    type="number"
                                    name="eExp"
                                    placeholder="Enter Employee Experience (in Years)"
                                    value={editUserData.experience}
                                    required={true}
                                    onChange={e => setEditUserData({ ...editUserData, experience: e.target.value })}
                                />

                                <label htmlFor="eSal">Employee Salary</label>
                                <input
                                    className="my-2 rounded p-2 w-75 mx-auto"
                                    type="number"
                                    name="eSal"
                                    placeholder="Enter Employee Salary (in LPA)"
                                    value={editUserData.salary}
                                    required={true}
                                    onChange={e => setEditUserData({ ...editUserData, salary: e.target.value })}
                                />
                            </form>
                        </div>

                        <div className="d-flex justify-content-evenly mb-3">
                            <button type="button" className="btn btn-dark w-25" data-bs-dismiss="modal" ref={refClose}>Close</button>

                            <button
                                type="submit"
                                onClick={handleEdit}
                                className="btn btn-success w-50">Edit</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Home;