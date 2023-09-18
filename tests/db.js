const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");


(async function createMMS() {
  //connect to db
  const connect = async () => {
    let mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(uri, mongooseOpts);
  };

  //disconnect and close connection
  const closeDatabase = async () => {
    let mongod = await MongoMemoryServer.create();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  };

  //clear db
  const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  };
  beforeAll(async () => await connect());

  afterEach(async () => await clearDatabase());

  afterAll(async () => await closeDatabase());
})();