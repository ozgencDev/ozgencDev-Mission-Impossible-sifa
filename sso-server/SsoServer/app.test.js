const app = require("./server");
const request = require("supertest");

describe("Given username", () => {
  test("If the user is correct", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "sevda123",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
  });
  test("If the user is not correct", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "sevda12",
      password: "1234567",
    });
    expect(response.statusCode).toBe(404);
  });
});

describe("API Routes", () => {
  test("Creating User", async () => {
    const response = await request(app).post("/api/create").send({
      username: "Api123",
      user_name: "Api",
      user_surname: "Server",
      password: "123abcd",
      email: "api@gmail.com",
      user_type: "User",
    });
    expect(response.statusCode).toBe(200);
  });
  test("Error Creating User", async () => {
    const response = await request(app).post("/api/create").send({
      username: "Api123",
      user_name: "Api",
      user_surname: "Server",
      password: "123abcd",
      email: "api@gmail.com",
      user_type: "User",
    });
    expect(response.statusCode).toBe(500);
  });
});

/*const server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let assert = require("chai").assert;
const expect = chai.expect;

chai.use(chaiHttp);

describe("Post /users/login", () => {
  it("Should login user and return auth token", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        username: "sevda12",
        password: "123456",
      })
      .expect((res) => {
        expect(res.headers["x-access-token"]).not.toBeNull();
      })
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.have.keys("accessToken");
      });
  });
  /*it("Should reject invalid login", (done) => {});
});

/*describe("/auth/controller", function () {
  it("returns a json", (done) => {
    chai
      .request(server)
      .get("/auth/login")
      .end((err, res) => {
        res.body.should.have.keys("accessToken");
        done();
      });
  });
});*/
