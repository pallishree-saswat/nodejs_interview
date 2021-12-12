const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/add", async (req, res) => {
  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/posts",
    data: req.body,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      //handle success
      console.log(response);
      res.json(response.data);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(2000, () => {
  console.log("server started on 2000");
});
