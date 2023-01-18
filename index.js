const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use(bodyParser.json());

const posts = {};

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // Calling Event Bus
  // await axios.post("http://localhost:4005/events", {
  //   type: "PostCreated",
  //   data: {
  //     id,
  //     title,
  //   },
  // });

  res.status(201).send(posts[id]);
});

// Listening to events
// app.post("/events", (req, res) => {
//   console.log("Recieved Event", req.body.type);
//   res.send({});
// });

app.listen(4000, () => {
  console.log("Listening on 4000 :>> ");
});
