﻿import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

mongoose.connect(process.env.MONGODB_URI!);

const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("server started on port 7000");
});
