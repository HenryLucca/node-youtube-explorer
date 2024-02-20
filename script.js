import * as dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";
const gapi = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});

const comments = await getVideoComments();

console.log("Comments:", comments);

async function getVideoComments() {
  return gapi.commentThreads
    .list({
      part: ["snippet"],
      order: "relevance",
      videoId: "r55_hiiN520",
    })
    .then(
      function (response) {
        return response.data.items;
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
