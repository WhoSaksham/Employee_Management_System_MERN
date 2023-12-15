const { Schema, model } = require('mongoose');

const employeeSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Provide Employee Name"]
    },
    department: {
        type: String,
        trim: true,
        required: [true, "Provide Employee Department"]
    },
    role: {
        type: String,
        trim: true,
        required: [true, "Provide Employee Role"]
    },
    experience: {
        type: Number,
        required: [true, "Provide Employee Experience"]
    },
    salary: {
        type: Number,
        required: [true, "Provide Employee Salary"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee;