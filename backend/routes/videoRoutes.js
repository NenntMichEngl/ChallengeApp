const express = require("express");
const multer = require("multer");
const videoController = require("../controllers/videoController");
const path = require("path");
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fs = require("fs");
router.post("/like", videoController.likeVideo);
router.post("/dislike", videoController.dislikeVideo);
router.get("/video/:index", videoController.getVideoWithIndex);
router.get("/videoWithChallenge/:index/:challengeId", videoController.getVideoWithIndexAndChallange);
router.post("/videoData", videoController.getVideoDataIndex);
router.get("/videoDataWithChallenge/:index/:challengeId", videoController.getVideoDataIndexWithChallenge);
router.get("/getAll", videoController.getAllVideos);

const upload = multer({ storage });

// Route to list all videos
router.get("/", videoController.getAllVideos);

router.get("/challenges", videoController.getAllChallenges);
router.post("/challenges/create", videoController.createChallenge);
router.get("/challenges/delete", videoController.deleteAllChallenges);
// Route to upload a video
router.post("/upload", upload.single("video"), videoController.uploadVideo);

router.get("/delete", videoController.deleteAllVideos);

module.exports = router;
