const app = require("./server");
const request = require("supertest");

userOne = {
  username: "Api123",
  password: "123abcd",
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOjQsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2NDEzMjY3ODMsImV4cCI6MTY0MTMyNzY4M30.Jpp5EZ6NsB9radK37VHSx33mRu5Nmtqp8l5R6r1rBVJlZdyjVZxQKTj6YFQWSFfDkEgFrSXWE47AlkTRLONKvOxv6CllHQBUw-z9f6YdelFkTNzRTFkeucnJoKsVMPMuKlTwvuTCUfFavs9BS0N56X4aVdTJ1D87zarADKe-eGs",
};

describe("Given username", () => {
  test("If the user exists", async () => {
    const response = await request(app).post("/auth/login").send({
      username: userOne.username,
      password: userOne.password,
    });
    expect(response.statusCode).toBe(200);
  });
  test("If the user doesn't exist", async () => {
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
      user_type: "User",
    });
    expect(response.statusCode).toBe(400);
  });

  test("List of Users Authorized", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("x-access-token", userOne.token);
    expect(response.statusCode).toBe(200);
  });

  test("List of Users UnAuthorized", async () => {
    const response = await request(app).put("/api/users");
    expect(response.statusCode).toBe(404);
  });

  test("User Info Authorized", async () => {
    const response = await request(app)
      .get("/api/user/94")
      .set("x-access-token", userOne.token);
    expect(response.statusCode).toBe(200);
  });

  test("User Info UnAuthorized", async () => {
    const response = await request(app).put("/api/user/94");
    expect(response.statusCode).toBe(404);
  });

  test("Updating User Authorized", async () => {
    const response = await request(app)
      .put("/api/update/764")
      .set("x-access-token", userOne.token)
      .send({
        email: "deneme@gmail.com",
      });
    expect(response.statusCode).toBe(200);
  });

  test("Updating User UnAuthorized", async () => {
    const response = await request(app).put("/api/update/764");
    expect(response.statusCode).toBe(401);
  });

  test("Deleting User UnAuthorized", async () => {
    const response = await request(app).delete("/api/delete/144");
    expect(response.statusCode).toBe(401);
  });
});
