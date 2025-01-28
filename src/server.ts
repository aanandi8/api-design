import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`);
  next();
};
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({ message: "hello" });
});
app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/sign-in", signin);

// Only works for synchronous errors
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, thats on us" });
  }
  console.log(err);
  res.json({ message: "oops! there was an error" });
});

export default app;
