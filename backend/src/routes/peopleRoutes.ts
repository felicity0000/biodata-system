import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import People, { PeopleType } from "../models/people";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

router.post(
  "/",
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const existingPeople = await People.findOne({ email: req.body.email });

      if (existingPeople) {
        return res.status(400).json({ message: "email exists" });
      }
      const imageFiles = req.files as Express.Multer.File[];
      const newPeople: PeopleType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer.toString("base64"));
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });
      const imageUrls = await Promise.all(uploadPromises);
      newPeople.imageUrls = imageUrls;
      newPeople.lastUpdated = new Date();

      const people = new People(newPeople);
      await people.save();
      res.status(201).send(people);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const people = await People.find({});
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});


export default router;
