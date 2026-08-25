import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;

    if (!username?.trim() || !email?.trim() || !password) {
      return response.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    const existingUsername = await User.findOne({
      username: username.trim().toLowerCase(),
    });

    if (existingUsername) {
      return response.status(409).json({
        message: "Username already exists",
      });
    }

    const existingEmail = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingEmail) {
      return response.status(409).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      username: username.trim(),
      email: email.trim(),
      password,
    });

    return response.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email?.trim() || !password) {
      return response.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return response.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return response.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return response.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
