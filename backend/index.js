import express from "express";
import pkg from "pg";
import cors from "cors";
import cookieParser from "cookie-parser";
import { usersRouter } from "./src/routes/users.js";
import { authRouter } from "./src/routes/authentication.js";
import { itemsRouter } from "./src/routes/items.js";
import { gptRouter } from "./src/routes/gpt.js";
import { auth } from "./src/routes/authentication.js";
import { POOL, PORT } from "./config.js";

const { Pool } = pkg;
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());
export const pool = new Pool(POOL);

// to check if server is running
app.get("/", (req, res) => {
  res.send("<h2>Welcome to the kitchen!</h2>");
});

app.use("/", authRouter);

// apply auth middleware to all following routes
app.use(auth);

app.use("/items", itemsRouter);
app.use("/users", usersRouter);
app.use("/gpt", gptRouter);

const server = app.listen(PORT, '0.0.0.0', () =>
  console.log(`the chef is running on port ${PORT}`)
);

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully...");
  server.close((err) => {
    if (err) {
      console.error("Error closing server", err);
      process.exit(1);
    }
    pool.end((err) => {
      if (err) {
        console.error("Error closing connection pool", err);
        process.exit(1);
      }
      console.log("Server closed and connection pool ended");
      process.exit(0);
    });
  });
});

export { app };
