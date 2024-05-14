import request from "supertest";
import express from "express";
import { itemsRouter } from "../routes/items.js";

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
app.use(express.json());
app.use("/", itemsRouter);

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

// tests for items routes
describe("Items Routes", () => {
  describe("GET /", () => {
    it("should return a 200 status code and all items", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          name: "testItem1",
          id: 1,
          count: 1,
        },
        {
          name: "testItem2",
          id: 2,
          count: 2,
        },
      ]);
    });
  });

  describe("GET /:id", () => {
    it("should return a 200 status code and the item with the specified id", async () => {
      const response = await request(app).get("/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        name: "testItem1",
        id: 1,
        count: 1,
      });
    });
  });

  describe("POST /", () => {
    it("should return a 201 status code and a success message on successful creation of an item", async () => {
      const response = await request(app).post("/").send({
        name: "testItem3",
        id: 3,
        count: 3,
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Item created successfully");
    });
  });

  describe("POST /bulk", () => {
    it("should return a 201 status code and a success message on successful creation of multiple items", async () => {
      const response = await request(app)
        .post("/bulk")
        .send([
          {
            name: "testItem4",
            id: 4,
            count: 4,
          },
          {
            name: "testItem5",
            id: 5,
            count: 5,
          },
        ]);
      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Items created successfully");
    });
  });

  describe("DELETE /:id", () => {
    it("should return a 200 status code and a success message on successful deletion of an item", async () => {
      const response = await request(app).delete("/1");
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Item deleted successfully");
    });
  });

  describe("POST /deleteBulk", () => {
    it("should return a 200 status code and a success message on successful deletion of multiple items", async () => {
      const response = await request(app).post("/deleteBulk").send([2, 3]);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Items deleted successfully");
    });
  });

  describe("DELETE /", () => {
    it("should return a 200 status code and a success message on successful deletion of all items", async () => {
      const response = await request(app).delete("/");
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("All items deleted successfully");
    });
  });
});

// after all tests, close the pool
afterAll(() => {
  return pool.end().catch((err) => console.error(err));
});
