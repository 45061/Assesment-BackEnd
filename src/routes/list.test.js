const req = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const jwt = require("jsonwebtoken");
const List = require("../models/list.model");
const User = require("../models/user.model");

describe("List", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
    const data = {
      userName: "Test",
      email: "correotest@test.com",
      password: "Hola1234",
      confirmPassword: "Hola1234*",
    };
    const user = await User.create(data);
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should created list corectly", async () => {
    const list = {
      titleList: "prueba",
    };

    const res = await req(app)
      .post("/list")
      .send(list)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
  });

  it("should show list corectly", async () => {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("estees id", id);
    const list = {
      titleList: "prueba",
      userId: id,
    };
    const listNew = await List.create(list);
    const listId = listNew._id.toString();
    const res = await req(app)
      .get(`/list/${listId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
