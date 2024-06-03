"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const peopleRoutes_1 = __importDefault(require("./routes/peopleRoutes"));
const adminAuthRoutes_1 = __importDefault(require("./routes/adminAuthRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to the database!", process.env.MONGODB_CONNECTION_STRING);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use("/api/users", peopleRoutes_1.default);
app.use("/api/admin", adminAuthRoutes_1.default);
app.listen(5000, () => {
    console.log("The server is running on port 5000!");
});
