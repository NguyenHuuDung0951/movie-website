import { model, Schema, Types } from "mongoose";

export interface IPlaylistMovie {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string;
}

export interface IPlaylist {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  movies: IPlaylistMovie[];
  isPublic: boolean;
}

const playlistMovieSchema = new Schema<IPlaylistMovie>(
  {
    tmdbId: { type: Number, required: true },
    mediaType: { type: String, enum: ["movie", "tv"], required: true },
    title: { type: String, required: true },
    posterPath: { type: String, required: true },
  },
  { _id: false },
);

const playlistSchema = new Schema<IPlaylist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    movies: { type: [playlistMovieSchema], default: [] },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Playlist = model<IPlaylist>("Playlist", playlistSchema);
