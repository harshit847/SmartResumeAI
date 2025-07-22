"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_model_1.default.create({
            userName,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser._id, email: newUser.email, userName: newUser.userName },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        return res.status(401).json({ message: "user not registered" });
    const isMatch = yield bcryptjs_1.default.compare(password, user.password.toString());
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            email: user.email,
            userName: user.userName,
        },
    });
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "Logout successful (token invalidated on client)" });
});
exports.logoutUser = logoutUser;
