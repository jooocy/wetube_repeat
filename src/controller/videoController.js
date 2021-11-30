import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ date: "desc" });
    res.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    console.log("videos find error: ", error);
    return res.send("error");
  }
};

export const getUpload = async (req, res) => {
  res.render("upload", { pageTitle: "UPLOAD" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;
  try {
    await Video.create({
      title,
      description,
      hashtags,
    });
    res.redirect("/");
  } catch (error) {
    console.log("video create error: ", error);
  }
};

export const watchVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);

    res.render("watchVideo", { pageTitle: "WATCH", video });
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.log("delete error: ", error);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: video.title, video });
  } catch (error) {
    console.log("edit Video error: ", error);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    body: { title, description, hashtags },
    params: { id },
  } = req;
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags,
    });
    res.redirect(`/videos/${id}`);
  } catch (error) {
    console.log("post edit video error: ", error);
  }
};
