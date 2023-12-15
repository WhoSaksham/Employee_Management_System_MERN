const router = require('express').Router();
const { verifyToken } = require('../utils/functions');
const { getAllEmployeesController, getEmployeeByIdController, updateEmployeeByIdController, deleteEmployeeByIdController, addEmployeeController } = require('../controllers/employee.controller');

router.get('/', verifyToken, getAllEmployeesController);

router.get('/:id', verifyToken, getEmployeeByIdController);

router.post('/', verifyToken, addEmployeeController);

router.put('/:id', verifyToken, updateEmployeeByIdController);

router.delete('/:id', verifyToken, deleteEmployeeByIdController);

module.exports = router;