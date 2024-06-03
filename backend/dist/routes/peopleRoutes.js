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
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const people_1 = __importDefault(require("../models/people"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});
router.post("/", upload.array("imageFiles", 6), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingPeople = yield people_1.default.findOne({ email: req.body.email });
        if (existingPeople) {
            return res.status(400).json({ message: "email exists" });
        }
        const imageFiles = req.files;
        const newPeople = req.body;
        const uploadPromises = imageFiles.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer.toString("base64"));
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = yield cloudinary_1.default.v2.uploader.upload(dataURI);
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        newPeople.imageUrls = imageUrls;
        newPeople.lastUpdated = new Date();
        const people = new people_1.default(newPeople);
        yield people.save();
        res.status(201).send(people);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield people_1.default.find({});
        res.json(people);
    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
}));
exports.default = router;
