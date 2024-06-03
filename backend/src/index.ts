import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import {v2 as cloudinary} from 'cloudinary';
import peopleRoutes from "./routes/peopleRoutes"
import adminAuthRoutes from "./routes/adminAuthRoutes";
import cookieParser from "cookie-parser";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log(
    "Connected to the database!",
    process.env.MONGODB_CONNECTION_STRING
  );
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/users", peopleRoutes);
app.use("/api/admin", adminAuthRoutes);

app.listen(5000, ()=> {
    console.log("The server is running on port 5000!")
})