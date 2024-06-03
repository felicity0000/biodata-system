import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type AdminType = {
    _id: string;
    userName: string;
    password: string;
};

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});
adminSchema.pre("save", async function (next) {
    if(this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8)
    }
    next();
  });

const Admin = mongoose.model<AdminType>("Admin", adminSchema);

export default Admin;