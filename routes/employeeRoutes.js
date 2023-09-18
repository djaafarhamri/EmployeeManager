// user routes
const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getAll,
  getBasedOnCreationDate,
  checkIn,
  checkOut,
} = require("../controllers/employeeController");

router.post("/add", async (req, res) => {
  const { firstName, lastName, departement } = req.body;
  try {
    const newEmployee = await addEmployee({ firstName, lastName, departement });
    res
      .status(200)
      .json({ message: "employee added successfully", data: newEmployee });
  } catch (error) {
    res.status(400).json({ message: "employee added failed", error: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const employees = await getAll();
    res
      .status(200)
      .json({ message: "employees fetched successfully", data: employees });
  } catch (error) {
    res.status(404).json({ message: "employees fetched failed", error: error.message });
  }
});

router.get("/getBasedOnCreationDate/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const employees = await getBasedOnCreationDate({ date });
    res
      .status(200)
      .json({ message: "employees fetched successfully", data: employees });
  } catch (error) {
    res.status(404).json({ message: "employees fetched failed", error: error.message });
  }
});

router.put("/check-in/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  try {
    const employee = await checkIn({ employeeId });
    res
      .status(200)
      .json({ message: "employee checkedIn successfully", data: employee });
  } catch (error) {
    res.status(400).json({ message: "employee checkedIn failed", error: error.message });
  }
});

router.put("/check-out/:employeeId", async (req, res) => {
  const { comment } = req.body;
  const { employeeId } = req.params;
  try {
    const employee = await checkOut({ comment, employeeId });
    res
      .status(200)
      .json({ message: "employee checkedOut successfully", data: employee });
  } catch (error) {
    res.status(400).json({ message: "employee checkedOut failed", error: error.message });
  }
});

module.exports = router;
