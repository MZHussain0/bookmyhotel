import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);

const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req, res) => {
  res.json({ message: "hello from express" });
});

app.listen(7000, () => {
  console.log("server started on port 7000");
});
