import express from "express";
import { pool } from "../../index.js";
import jwt from "jsonwebtoken";
import { JSWT_SECRET } from "../../config.js";

const router = express.Router();

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (!user) {
    return res.status(401).json("Invalid credentials");
  }

  const validPassword = password === user.password;
  if (!validPassword) {
    return res.status(401).json("Invalid credentials");
  }

  const token = jwt.sign(user, JSWT_SECRET);

  // set the JWT as a cookie on the response
  res.cookie("token", token, {
    httpOnly: false,
    path: "/",
    maxAge: 36000000,
  });

  return res.status(200).json({ token: token, message: "Login successful" });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // TO DO validate the input, hash the password, etc.
  // if name, email, or password is missing, send an error
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = await pool.query(
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
    [name, email, password]
  );

  const user = result.rows[0];

  const token = jwt.sign(user, JSWT_SECRET);
  // set the JWT as a cookie on the response
  res.cookie("token", token, {
    httpOnly: false,
    path: "/",
    maxAge: 36000000,
  });

  return res.status(201).json({ token: token, message: "Signup successful" });
});

// authentication middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if the header is not present
  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  // Check if the header is in the correct format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Invalid token format");
  }

  // Extract the token from the header
  const token = authHeader.slice(7);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const payload = jwt.verify(token, JSWT_SECRET);
    req.user = payload;
  } catch (ex) {
    return res.status(400).json({ message: "Invalid token." });
  }
  next();
}

export { router as authRouter };
export { auth };
