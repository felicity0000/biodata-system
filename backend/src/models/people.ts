import mongoose from "mongoose";

export type PeopleType = {
    _id: string;
    firstName: string;
    lastName: string;
    religion: string;
    email: string;
    DOB: Date;
    age: number;
    telephone: string;
    nationality: string;
    occupation: string;
    gender: string;
    imageUrls: string[];
    lastUpdated: Date;
};

const peopleSchema = new mongoose.Schema({
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

const People = mongoose.model<PeopleType>("People", peopleSchema);
export default People;