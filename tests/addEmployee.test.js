const { addEmployee, getAll } = require("../controllers/employeeController");
require('./db')
describe("add employee", () => {
  it("should add an employee", async () => {
    const { _id } = await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
    });
    const employee = await getAll();
    expect(_id).toEqual(employee[0]._id);
    expect(new Date(employee[0].dateCreated).toISOString().split('T')[0]).toEqual(new Date().toISOString().split('T')[0]);
  });

    it("should not add an employee without a firstName", async () => {
      const employees = [
        {
          lastName: "test",
          departement: "test",
        },
        {
          firstName: "",
          lastName: "test",
          departement: "test",
        },
      ];
      await expect(addEmployee(employees[0])).rejects.toThrow(
        "EmployeeSchema validation failed: firstName: please enter your first name"
      );
      await expect(addEmployee(employees[1])).rejects.toThrow(
        "EmployeeSchema validation failed: firstName: please enter your first name"
      );
    });

    it("should not add an employee without a lastName", async () => {
      const employees = [
        {
          firstName: "test",
          departement: "test",
        },
        {
          firstName: "test",
          lastName: "",
          departement: "test",
        },
      ];
      await expect(addEmployee(employees[0])).rejects.toThrow(
        "EmployeeSchema validation failed: lastName: please enter your last name"
      );
      await expect(addEmployee(employees[1])).rejects.toThrow(
        "EmployeeSchema validation failed: lastName: please enter your last name"
      );
    });

    it("should not add an employee without a departement", async () => {
      const employees = [
        {
          firstName: "test",
          lastName: "test",
        },
        {
          firstName: "test",
          lastName: "test",
          departement: "",
        },
      ];
      await expect(addEmployee(employees[0])).rejects.toThrow(
        "EmployeeSchema validation failed: departement: please enter your departement"
      );
      await expect(addEmployee(employees[1])).rejects.toThrow(
        "EmployeeSchema validation failed: departement: please enter your departement"
      );
    });
});
