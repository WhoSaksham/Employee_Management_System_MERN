const Employee = require("../models/employee.model");

const getAllEmployeesController = async (req, res) => {
    try {
        const response = await Employee.find();

        return res.status(200).json({ success: true, message: "All Employees Fetch Success", total_responses: response.length, response });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        console.log("Error =>", error);
    }
}

const getEmployeeByIdController = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });

        if (!employee) return res.status(404).json({ success: false, message: "No Employee found with given ID." });

        return res.status(200).json({ success: true, mesaage: "Employee by ID Fetch Success", response: employee });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        console.log("Error =>", error);
    }
};

const addEmployeeController = async (req, res) => {
    try {
        const employee = Employee({
            name: req.body.name,
            department: req.body.department,
            role: req.body.role,
            experience: req.body.experience,
            salary: req.body.salary
        });

        const response = await employee.save();

        res.status(201).json({ success: true, message: "New Employee Added Successfully.", response });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        console.log("Error =>", error);
    }
}

const updateEmployeeByIdController = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });

        if (!employee) return res.status(404).json({ success: false, message: "No such employee found with given ID." });

        const updatedEmployee = await Employee.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });

        res.status(200).json({ success: true, message: "Employee Update Success.", response: updatedEmployee });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        console.log("Error =>", error);
    }
}

const deleteEmployeeByIdController = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });

        if (!employee) return res.status(404).json({ success: false, message: "No such employee found with given ID." });

        const deletedEmployee = await Employee.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json({ success: true, message: "Employee Delete Success.", response: deletedEmployee });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        console.log("Error =>", error);
    }
}

module.exports = { getAllEmployeesController, getEmployeeByIdController, addEmployeeController, updateEmployeeByIdController, deleteEmployeeByIdController };