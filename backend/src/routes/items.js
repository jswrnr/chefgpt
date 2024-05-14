import express from "express";
import { pool } from "../../index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM items");
  return res.status(200).json(result.rows);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    res.status(404).json({ message: "ID not found" });
    return;
  }
  res.status(200).json(result.rows[0]);
});

router.post("/", async (req, res) => {
  const { name, count } = req.body;
  const result = await pool.query(
    "INSERT INTO items (name, count) VALUES ($1, $2) RETURNING *",
    [name, count]
  );
  if (result.rowCount === 1) {
    return res
      .status(201)
      .json({ message: "Item created successfully", item: result.rows[0] });
  } else {
    return res.status(500).json({ message: "Item creation failed" });
  }
});

router.post("/bulk", async (req, res) => {
  const items = req.body;
  const queryText = "INSERT INTO items (name, count) VALUES ($1, $2)";
  for (let item of items) {
    await pool.query(queryText, [item.name, item.count]);
  }
  res.status(201).json({ message: "Items created successfully" });
});

// update item
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  const { name, count } = req.body;
  const result = await pool.query(
    "UPDATE items SET name = $1, count = $2 WHERE id = $3 RETURNING *",
    [name, count, id]
  );
  if (result.rows.length === 0) {
    res.status(404).json({ message: "ID not found" });
    return;
  }
  res
    .status(200)
    .json({ message: "Item updated successfully", item: result.rows[0] });
});

router.post("/deleteBulk", async (req, res) => {
  const idsToDelete = req.body;
  // check that all ids are valid
  for (let id of idsToDelete) {
    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
  }
  const queryText = "DELETE FROM items WHERE id = $1";
  for (let id of idsToDelete) {
    await pool.query(queryText, [id]);
  }
  res.status(200).json({ message: "Items deleted successfully" });
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
  res.status(200).json({ message: "Item deleted successfully" });
});

router.delete("/", async (req, res) => {
  await pool.query("DELETE FROM items");
  res.status(200).json({ message: "All items deleted successfully" });
});

export { router as itemsRouter };
