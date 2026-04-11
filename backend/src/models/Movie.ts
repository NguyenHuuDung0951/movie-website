import { model, Schema, Types } from "mongoose";

export interface IMovie {
  title: string;
  slug: string;
  description: string;
  genre: string;
  releaseYear: number;
  posterUrl?: string;
  createdBy?: Types.ObjectId;
}

const movieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    genre: { type: String, required: true, trim: true },
    releaseYear: { type: Number, required: true },
    posterUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

movieSchema.index({ title: "text", description: "text", genre: 1, releaseYear: -1 });

export const Movie = model<IMovie>("Movie", movieSchema);
