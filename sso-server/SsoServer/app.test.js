const app = require("./server");
const request = require("supertest");

userOne = {
  username: "Api123",
  password: "123abcd",
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOjExNjQsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTY0MDY5ODk1OCwiZXhwIjoxNjQwNzg1MzU4fQ.MucEHkKzrfr73dLtXhZSUO_2BRXP3MHxuoyVQ3cUm8OIpdvNBX2duf3ODB97hdZoXghOeIFLbtMHxeo2g4nWy1Bt1AtL5fOfVrsmMHfgIaUc29azkpXONnKDD5OLmTehjkgbDAuiu88mo0xIzOfRa3btfZaDG3aJvHMRog0he3o",
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
  test("New access token generate", async () => {
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
  /*test("Error Creating User", async () => {
    const response = await request(app).post("/api/create").send({
      username: "Api123",
      user_name: "Api",
      user_surname: "Server",
      password: "123abcd",
      email: "api@gmail.com",
      user_type: "User",
    });
    expect(response.statusCode).toBe(500);
  });*/

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
      .get("/api/user/1324")
      .set("x-access-token", userOne.token);
    expect(response.statusCode).toBe(200);
  });

  test("User Info UnAuthorized", async () => {
    const response = await request(app).put("/api/user/1324");
    expect(response.statusCode).toBe(404);
  });

  //Available id's:
  test("Updating User Authorized", async () => {
    const response = await request(app)
      .put("/api/update/14")
      .set("x-access-token", userOne.token)
      .send({
        email: "deneme@gmail.com",
      });
    expect(response.statusCode).toBe(200);
  });

  test("Updating User UnAuthorized", async () => {
    const response = await request(app).put("/api/update/1144");
    expect(response.statusCode).toBe(401);
  });

  /*test("Deleting User Authorized", async () => {
    const login = await request(app).post("/auth/login").send({
      username: "sevda123",
      password: "123456",
    });
    const { accessToken } = login.body;
    const response = await request(app)
      .delete("/api/delete/1124")
      .set("x-access-token", accessToken);
    expect(response.statusCode).toBe(200);
  });*/

  test("Deleting User UnAuthorized", async () => {
    const response = await request(app).delete("/api/delete/1124");
    expect(response.statusCode).toBe(401);
  });
});
