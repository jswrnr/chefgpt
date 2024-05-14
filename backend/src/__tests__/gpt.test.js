import request from "supertest";
import express from "express";
import { gptRouter } from "../routes/gpt.js";
import fs from "fs";
import path from "path";

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

import { pool } from "../../index.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/", gptRouter);

// before all tests, connect to the database and delete all data
beforeAll(async () => {
  // Connect to the database
  await pool.connect();

  // Delete all existing data
  await pool.query("DELETE FROM items");

  // then insert test entries with name, id, count
  await pool.query(`
        INSERT INTO items (name, id, count)
        VALUES ('testItem1', 1, 1),
             ('testItem2', 2, 2);
    `);
});

// test for recognizeImage route
describe("recognizeImage", () => {
  it("should return a 201 status code and a message", async () => {
    // import the image from /testImg/img.jpg
    const image = fs.readFileSync(path.join(__dirname, "testImg", "img.jpg"));
    const response = await request(app)
      .post("/recognizeImage")
      .send({ image: image.toString("base64") });
    console.log(response.body);
    console.log(response.status);
    console.log(response.message);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Items created successfully" });
  }, 60000);
});

// after all tests, close the pool
afterAll(() => {
  return pool.end().catch((err) => console.error(err));
});
