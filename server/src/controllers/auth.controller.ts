import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign(
            { id: (newUser as any)._id.toString() },
            JWT_SECRET,
            { expiresIn: "7d" }
        ); res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser._id, email: newUser.email, userName: newUser.userName },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: "user not registered" })
    const isMatch = await bcrypt.compare(password, user.password.toString());
        const token = jwt.sign(
      { id: (user as any)._id.toString() },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

 

    return res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            email: user.email,
            userName: user.userName,
        },
    });
};

export const logoutUser = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "Logout successful (token invalidated on client)" });
};


