import express from "express";
import { pool } from "../../index.js";
const router = express.Router();

// get a user by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (err, res) => {
    console.log(err, res.rows);
  });
  res.send(`User ${id} found`);
});

// add a new user to the users table
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  pool.query(
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
    [name, email, password],
    (err, res) => {
      console.log(err, res);
    }
  );
});

// update a user in the users table
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  pool.query(
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
    [name, email, password, id],
    (err, res) => {
      console.log(err, res);
    }
  );
});

// delete a user from the users table
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (err, res) => {
    console.log(err, res);
  });
});

// get all users from the users table
router.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (err, res) => {
    console.log(err, res.rows);
  });
});

export { router as usersRouter };
