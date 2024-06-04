import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import People, { PeopleType } from "../models/people";
import { body, validationResult } from "express-validator";

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
  [body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("religion").notEmpty().withMessage("religion is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("DOB").notEmpty().withMessage("Date of Birth is required"),
  body("age").notEmpty().isNumeric().withMessage("Age is required"),
  body("telephone").notEmpty().withMessage("Telephone is required"),
  body("nationality").notEmpty().withMessage("Nationality is required"),
  body("occupation").notEmpty().withMessage("Occupation is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("firstName").notEmpty().withMessage("first name is required")
  ],
  upload.array("imageFiles", 1),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
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
