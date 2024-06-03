import express, { Request, Response } from "express";
import Admin from "../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/authMiddleware";

const router = express.Router();

// creating the admin
router.post("/register", async (req: Request, res: Response) => {
  try {
    // 1.Check the user model to find if a user exists
    let admin = await Admin.findOne({ userName: req.body.userName });

    // 2.if user exists
    if (admin) {
      return res.status(400).json({ message: "User already exists" });
    }
    // 3.Create user
    admin = new Admin(req.body);

    // 4.Save user
    await admin.save();

    // 5. Create token
    const token = jwt.sign(
      { userId: admin.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).send({ message: "Admin created OK!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});


//authentication
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: admin.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    res.status(200).json({ adminId: admin._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// get admin
router.get(
  "/validate-token",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      // 1.Assuming req.userId is populated by the verifyToken middleware
      const userId = req.userId;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID not found in request" });
      }
      // 2.Fetch the user from the database
      const user = await Admin.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // 3.Send back the user details (excluding sensitive information like password)
      res.status(200).send({
        userName: user.userName,
        //Add other user fields you want to return here
      });
      res.status(200).send({ userId: req.userId });
    } catch (error) {}
  }
);

// admin logout
router.post("/logout", (req: Request, res: Response)=>{
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
