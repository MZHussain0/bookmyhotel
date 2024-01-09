import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

const router = express.Router();

router.post(
  "/login",

  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log("[AUTH_POST_LOGIN]", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
