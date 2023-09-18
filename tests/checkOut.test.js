const {
  addEmployee,
  getAll,
  checkIn,
  checkOut,
} = require("../controllers/employeeController");
require("./db");

describe("check in", () => {
    
  it("should check out an employee", async () => {
    const { _id } = await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
    });
    await checkIn({
      comment: "test",
      employeeId: _id,
    });
    await checkOut({
      comment: "test",
      employeeId: _id,
    });
    const employees = await getAll();
    const lastAttendance =
      employees[0].attendance[employees[0].attendance.length - 1];
    expect(employees[0].attendance.length).toEqual(1);
    expect(lastAttendance.comment).toEqual("test");
    expect(lastAttendance).toHaveProperty("checkIn");
    expect(lastAttendance).toHaveProperty("checkOut");
  });

  it("should not check out an employee when he's already out", async () => {
    const { _id } = await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
    });
    await checkIn({
      comment: "test",
      employeeId: _id,
    });
    await checkOut({
      comment: "test",
      employeeId: _id,
    });
    await expect(
      checkOut({
        comment: "test",
        employeeId: _id,
      })
    ).rejects.toThrow("Please check in first");
  });
});
