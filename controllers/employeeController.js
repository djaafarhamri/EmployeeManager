const Employee = require("../models/Employee");

module.exports.addEmployee = async ({ firstName, lastName, departement, dateCreated }) => {
  try {
    const newEmployee = new Employee({
      firstName,
      lastName,
      departement,
      dateCreated
    });
    const employee = await newEmployee.save();
    return employee;
  } catch (err) {
    throw err;
  }
};

module.exports.getAll = async () => {
  try {
    const employees = await Employee.find();
    return employees;
  } catch (err) {
    throw err;
  }
};
// and add a filter to get employees based on a date of creation ( e.g: "2021-01-05" )
module.exports.getBasedOnCreationDate = async ({ date }) => {
  var startDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
  var endDate = new Date(new Date(date).setUTCHours(23, 59, 59, 999));
  try {
    const employees = await Employee.find({
      dateCreated: { $gte: startDate, $lt: endDate },
    });
    return employees;
  } catch (err) {
    throw err;
  }
};

module.exports.checkIn = async ({ employeeId }) => {
  try {
    const employee = await Employee.findById(employeeId);
    if (employee.attendance.length > 0) {
      if (!employee.attendance[employee.attendance.length - 1].checkOut) {
        throw new Error("Employee is already checked in"); 
      }
    }
    employee.attendance.push({ checkIn: Date.now() });
    await employee.save();
    return employee;
  } catch (err) {
    throw err;
  }
};

module.exports.checkOut = async ({ comment, employeeId }) => {
  try {
    const employee = await Employee.findById(employeeId);
    if (employee.attendance.length === 0) {
      throw new Error("Please check in first");
    }
    if (employee.attendance[employee.attendance.length - 1].checkOut) {
      throw new Error("Please check in first");
    }
    employee.attendance[employee.attendance.length - 1].checkOut = Date.now();
    employee.attendance[employee.attendance.length - 1].comment = comment;
    employee.attendance[employee.attendance.length - 1].time = calculateTime(
      employee.attendance[employee.attendance.length - 1].checkIn,
      employee.attendance[employee.attendance.length - 1].checkOut
    );
    await employee.save();
    return employee;
  } catch (err) {
    throw err;
  }
};

const calculateTime = (checkIn, checkOut) => {
  const diff = checkOut.getTime() - checkIn.getTime();
  return diff / 1000 / 60 / 60;
};
