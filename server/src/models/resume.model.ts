import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
    userId: mongoose.Types.ObjectId;
    extractedText: string;
    suggestions: string;
    score: number;
    breakdown: {
        keywords: number;
        structure: number;
        readability: number;
    };
    cretaedAt: Date;
}

const ResumeSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        extractedText: { type: String, required: true },
        suggestions: { type: String, required: true },

        score: { type: Number, required: true },
        breakdown: {
            keywords: { type: Number, required: true },
            structure: { type: Number, required: true },
            readability: { type: Number, required: true },
        },
    },
    { timestamps: true }
);
const ResumeModel = mongoose.model<IResume>("Resume", ResumeSchema);
export default ResumeModel;
