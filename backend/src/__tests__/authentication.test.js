import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import { JSWT_SECRET } from "../../config.js";
import { auth } from "../routes/authentication.js";

jest.mock("../../index.js", () => {
  const Pool = jest.requireActual("pg").Pool;
  return {
    pool: new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "postgres",
      port: 5432,
    }),
  };
});

import { authRouter } from "../routes/authentication.js";
import { pool } from "../../index.js";

const app = express();
app.use(express.json());
app.use("/", authRouter);
// create a route for testing the auth middleware
app.get("/testAuth", auth, (req, res) => {
  return res.status(200).json({ message: "Authenticated" });
});

beforeAll(async () => {
  // Connect to the database
  await pool.connect();

  // Delete all existing data
  await pool.query("DELETE FROM users");

  // Insert data
  await pool.query(`
    INSERT INTO users (name, id, email, password)
    VALUES ('chef', 1, 'chef@gpt.com', '123456'),
           ('test', 2, 'test@user', 'testpassword');
  `);
});

describe("Authentication Routes", () => {
  describe("POST /login", () => {
    it("should return a 200 status code and a success message on successful login", async () => {
      const response = await request(app).post("/login").send({
        email: "test@user",
        password: "testpassword",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Login successful");

      // check that the response contains a token
      const decodedToken = jwt.verify(response.body.token, JSWT_SECRET);
      expect(decodedToken.id).toBe(2);
    });

    it("should return a 401 status code and an error message on invalid credentials", async () => {
      const response = await request(app).post("/login").send({
        email: "invalid@user",
        password: "invalidpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual("Invalid credentials");
    });
  });

  describe("POST /signup", () => {
    it("should return a 201 status code and a success message on successful signup", async () => {
      const response = await request(app).post("/signup").send({
        name: "newuser",
        email: "new@user",
        password: "newpassword",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Signup successful");
      // to do: check that the response contains a token
    });

    it("should return a 400 status code and an error message on missing required fields", async () => {
      const response = await request(app).post("/signup").send({
        username: "newuser",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Missing required fields" });
    });
  });
});

describe("Auth Middleware", () => {
  it("should return a 200 status code and a success message if the token is valid", async () => {
    // create a valid token
    const token = jwt.sign(
      {
        name: "chef",
        id: 1,
        email: "chef@gpt.com",
        password: "123456",
      },
      JSWT_SECRET
    );

    const response = await request(app)
      .get("/testAuth")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Authenticated");
  });

  it("should return a 401 status code if no token is provided", async () => {
    const response = await request(app).get("/testAuth");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Access denied. No token provided.");
  });

  it("should return a 400 status code if the token is invalid", async () => {
    const response = await request(app)
      .get("/testAuth")
      .set("Authorization", "invalid_token");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid token.");
  });
});

afterAll(() => {
  return pool.end().catch((err) => console.error(err));
});
