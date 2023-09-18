const {
  addEmployee,
  getBasedOnCreationDate,
} = require("../controllers/employeeController");
require("./db");
describe("get All employees based on creation date", () => {
  it("should get an empty array", async () => {
    const employee = await getBasedOnCreationDate({ date: "2021-01-05" });
    expect(employee).toEqual([]);
  });
  it("should get an array of employees created on 2021-01-05", async () => {
    await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
      dateCreated: "2021-01-05",
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
      dateCreated: "2021-01-05",
    });
    const employees = await getBasedOnCreationDate({ date: "2021-01-05" });
    expect(employees.length).toEqual(2);
    expect(employees[1].firstName).toEqual("test3");
    expect(employees[0]).toHaveProperty("_id");
  });
  // should not
  it("should not get an array of employees created on 2021-01-05", async () => {
    await addEmployee({
      firstName: "test",
      lastName: "test",
      departement: "test",
      dateCreated: "2021-01-05",
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
      dateCreated: "2021-01-05",
    });
    const employees = await getBasedOnCreationDate({ date: "2021-01-06" });
    expect(employees.length).toEqual(0);
  });
});
