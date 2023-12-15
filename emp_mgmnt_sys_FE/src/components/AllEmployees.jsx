
const AllEmployees = ({ employees, updateEmp, deleteEmp }) => {
    return (
        <>
            {
                employees.length > 0
                    ? employees.map(emp => {

                        const { name, role, department, experience, salary, _id: id } = emp;

                        return (
                            <div key={id} className="card rounded shadow m-3" id='employeeCard' style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title mt-2">{name}</h5>
                                    <p className="card-text text-capitalize">Job Role: {role}</p>
                                    <p className="card-text">Experience: {experience} Yrs</p>
                                    <p className="card-text">Salary: {salary} LPA</p>
                                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning p-2 text-dark fs-6">
                                        {department}
                                    </span>

                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-warning" onClick={() => updateEmp(id, { name, role, department, experience, salary })}><i className="fa-solid fa-pen-to-square mx-2 rounded shadow"></i></button>

                                        <button className="btn btn-danger" onClick={() => {
                                            const confirmed = window.confirm("Are you sure you want to permanently delete this Employee?");

                                            if (confirmed) deleteEmp(id)
                                        }}><i className="fa-solid fa-trash-can mx-2 rounded shadow"></i></button>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                    : <h4 className="fst-italic w-75 mx-auto">No Employee found, try Adding some!</h4>
            }

        </>
    )
}

export default AllEmployees;