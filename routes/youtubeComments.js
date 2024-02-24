const express = require("express");

const router = express.Router();

const youtubeComments = require("../controllers/youtubeComments");

router.route("/:videoId").get(youtubeComments.getAllYoutubeComments);

router
  .route("/:videoId/comments/:commentId")
  .get(youtubeComments.getYoutubeCommentsById)
  .post(youtubeComments.answerYoutubeComment);

module.exports = router;
