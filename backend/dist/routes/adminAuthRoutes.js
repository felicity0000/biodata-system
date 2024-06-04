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
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../models/admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const people_1 = __importDefault(require("../models/people"));
const router = express_1.default.Router();
// creating the admin
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1.Check the user model to find if a user exists
        let admin = yield admin_1.default.findOne({ userName: req.body.userName });
        // 2.if user exists
        if (admin) {
            return res.status(400).json({ message: "User already exists" });
        }
        // 3.Create user
        admin = new admin_1.default(req.body);
        // 4.Save user
        yield admin.save();
        // 5. Create token
        const token = jsonwebtoken_1.default.sign({ userId: admin.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.status(200).send({ message: "Admin created OK!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}));
//authentication
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const admin = yield admin_1.default.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: admin.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ adminId: admin._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
// get admin
router.get("/validate-token", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1.Assuming req.userId is populated by the verifyToken middleware
        const userId = req.userId;
        if (!userId) {
            return res
                .status(400)
                .json({ message: "User ID not found in request" });
        }
        // 2.Fetch the user from the database
        const user = yield admin_1.default.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // 3.Send back the user details (excluding sensitive information like password)
        res.status(200).send({
            userName: user.userName,
            //Add other user fields you want to return here
        });
        res.status(200).send({ userId: req.userId });
    }
    catch (error) { }
}));
// admin logout
router.post("/logout", (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
});
router.get("/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id.toString();
    try {
        const people = yield people_1.default.find({
            _id: id
        });
        res.json(people);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching people" });
    }
}));
exports.default = router;
