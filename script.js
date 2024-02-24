const express = require("express");

const indexRouter = require("./routes/index");
const youtubeCommentsRouter = require("./routes/youtubeComments");

const app = express();
app.use(express.json());

app.use("/", indexRouter);
app.use("/youtubeComments", youtubeCommentsRouter);

app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
