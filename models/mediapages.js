import Schema from "mongoose";

const MediaData = new Schema.Schema({
  Url: {
    type: String,
    required: true,
  },
});

const MediaPages = new Schema.Schema({
  MediaId: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  Slug: {
    type: String,
    required: true,
  },
  Data: {
    type: [MediaData],
    required: true,
  },
  UserProfile: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default MediaPages;
