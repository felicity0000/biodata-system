"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const peopleSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    imageUrls: [{
            type: String,
            required: true
        }],
    lastUpdated: {
        type: Date,
        required: true
    },
});
const People = mongoose_1.default.model("People", peopleSchema);
exports.default = People;
