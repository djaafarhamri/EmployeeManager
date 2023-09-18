const { addEmployee, getAll } = require("../controllers/employeeController");
require("./db");
describe("get All employees", () => {
  it("should get an empty array", async () => {
    const employee = await getAll();
    expect(employee).toEqual([]);
  });
  it("should get an array of employees", async () => {
    await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
    });
    await addEmployee({
      firstName: "test2",
      lastName: "test2",
      departement: "test2",
    });
    await addEmployee({
      firstName: "test3",
      lastName: "test3",
      departement: "test3",
    });
    const employees = await getAll();
    expect(employees.length).toEqual(3);
    expect(employees[1].firstName).toEqual("test2");
    expect(employees[0]).toHaveProperty("_id");
    expect(employees[0]).toHaveProperty("firstName");
    expect(employees[0]).toHaveProperty("lastName");
    expect(employees[0]).toHaveProperty("departement");
  });
});
