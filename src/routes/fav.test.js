const req = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const List = require("../models/list.model");

describe("Fav", () => {
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

  it("should created fav corectly", async () => {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const list = {
      titleList: "prueba",
      userId: id,
    };

    const fav = {
      titleFav: "prueba",
      description: "este es un fav de prueba",
      link: "https://www.youtube.com/watch?v=wvz97-lNPH8&t=1s",
    };

    const listNew = await List.create(list);
    const listId = listNew._id.toString();

    const res = await req(app)
      .post(`/list/${listId}/new-fav`)
      .send(fav)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
  });
});
