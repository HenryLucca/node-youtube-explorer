const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config();

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

exports.getAllYoutubeComments = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    let pageToken = null;
    let comments = [];

    do {
      const data = await getVideoComments(pageToken, videoId);
      comments = [...comments, ...data.items];
      pageToken = data.nextPageToken;
    } while (pageToken);

    res.send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching comments");
  }
};

exports.getYoutubeCommentsById = async (req, res) => {
  throw new Error("Not implemented");
};

exports.answerYoutubeComment = async (req, res) => {
  throw new Error("Not implemented");
};

function getVideoComments(pageToken, videoId) {
  return youtube.commentThreads
    .list({
      part: ["snippet", "replies"],
      videoId: videoId,
      pageToken: pageToken,
      maxResults: 100,
    })
    .then(
      function (response) {
        return response.data;
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
