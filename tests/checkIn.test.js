const {
    addEmployee,
    getAll,
    checkIn,
  } = require("../controllers/employeeController");
require("./db");


describe("check in", () => {
   it("should check in an employee", async () => {
    const { _id } = await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
    });
    await checkIn({
      employeeId: _id,
    });
    const employees = await getAll();
    expect(employees[0].attendance.length).toEqual(1);
    expect(employees[0].attendance[0].checkIn).toBeDefined();
    expect(employees[0].attendance[0].checkOut).toBeUndefined();
  });
  it("should not check in an employee when he's already in", async () => {
    const { _id } = await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
    });
    await checkIn({
      comment: "test",
      employeeId: _id,
    });
    await expect(
      checkIn({
        comment: "test",
        employeeId: _id,
      })
    ).rejects.toThrow("Employee is already checked in");
  });
  
});
  