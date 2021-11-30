import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "no description" },
  date: { type: Date, default: Date.now },
  meta: {
    views: { type: Number, default: 0 },
  },
  hashtags: { type: String },
  comments: [],
  holder: [],
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
