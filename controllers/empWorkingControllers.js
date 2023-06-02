import EmpWorking from "../models/EmpWork.js";

const AddEmployeeWorking = async (req, res, next) => {
    console.log(req.body)
    try {
        const {
            name, todayWorking
        } = req.body;
        const newEmployee = new EmpWorking({
            name,
            todayWorking
        });
        await newEmployee.save();
        return res.json({ message: "Employee working added successfully" });
    } catch (error) {
        next(error);
    }
};

const getALLEmployeesworking = async (req, res) => {
    try {
        const employees = await EmpWorking.find();
        return res.json(employees);
    } catch (error) {
        console.log(error);
    }
};

export {
    getALLEmployeesworking,
    AddEmployeeWorking,
};
