import * as dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";
const gapi = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});

const data = await getVideoComments();
const comments = data.items;

while (data.nextPageToken) {
  const nextData = await getVideoComments(data.nextPageToken);
  comments.push(...nextData.items);
  data.nextPageToken = nextData.nextPageToken;
}

console.log("Comments:", comments);

async function getVideoComments(pageToken) {
  return gapi.commentThreads
    .list({
      part: ["snippet"],
      order: "relevance",
      videoId: "r55_hiiN520",
      maxResults: 100,
      pageToken,
    })
    .then(
      function (response) {
        return response.data;
        // return response.data.items.map(
        //   (item) => item.snippet.topLevelComment.snippet.textDisplay
        // );
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
