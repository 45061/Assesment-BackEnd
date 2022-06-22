const req = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

describe("User", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should create a user correctly", async () => {
    const user = {
      userName: "Test",
      email: "correotest@test.com",
      password: "Hola1234",
      confirmPassword: "Hola1234",
    };

    const res = await req(app).post("/users/signup").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should create a user bad", async () => {
    const user = {
      userName: "Test",
      email: "correotest@test.com",
      password: "Hola1234",
      confirmPassword: "Hola1234*",
    };

    const res = await req(app).post("/users/signup").send(user);

    expect(res.statusCode).toBe(403);
  });

  it("should login corectly", async () => {
    const user = {
      userName: "Test",
      email: "correotest@test.com",
      password: "Hola1234",
      confirmPassword: "Hola1234",
    };

    const encPassword = await bcrypt.hash(user.password, 8);
    user.password = encPassword;

    await User.create(user);

    const user2 = {
      email: "correotest@test.com",
      password: "Hola1234",
    };

    const res = await req(app).post("/users/signin").send(user2);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});
