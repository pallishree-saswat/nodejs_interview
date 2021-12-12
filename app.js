const express = require("express");
const axios = require("axios")

const fs = require("fs");

const app = express();

//write a file
fs.writeFile("file.txt", "Hello everyone!!!!!!!", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully create a file");
  }
});

//read a file
fs.readFile("data.txt", "utf8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

let users = [
  {
    id: 1,
    name: "abc",
    email: "abc@gmail.com",
    mob: "9937796308",
  },
  {
    id: 2,
    name: "abc",
    email: "abc@gmail.com",
    mob: "9937796308",
  },
  {
    id: 3,
    name: "abc",
    email: "abc@gmail.com",
    mob: "9937796308",
  },
  {
    id: 4,
    name: "abc",
    email: "abc@gmail.com",
    mob: "9937796308",
  },
];


//salespush data
app.get("/salespush", async (req, res) => {
  let apikey =
    "3AC2356C8E9EEDD645F8A27700A65EBDCB78DFF709C47BB2EE5FCB92C360ED56C1E2B275380B5026F3114E4B24F823EF";
  //make request to send message API with token in header
  const responses = await axios({
    method: "POST",
    url: `https://api.elasticemail.com/v2/campaign/list`,
    headers: {
      "X-ElasticEmail-ApiKey": `${apikey}`,
    },
  });

  console.log(responses);

  var obj = {};

  for (let i = 0; i < responses.length; i++) {
    const response = await axios({
      method: "POST",
      url: ` https://api.elasticemail.com/v2/log/summary?from=2021-09-29&to=2021-09-30&channelName=${responses[i].name}`,
      headers: {
        "X-ElasticEmail-ApiKey": `${apikey}`,
      },
    });

    obj.name = responses.data[i].name;
    obj.send = response.data.logstatussummary.recipients;
    obj.open = response.data.logstatussummary.opened;
  }

  res.json({
    obj: responses,
  });
});



//add new data
app.get("/post", (req, res) => {
  let emp = {
    id: 5,
    name: "siv",
    email: "siv@gmail.com",
    mob: "8978456320",
  };
  console.log(emp);

  let employees = users.push(emp);

  res.json({
    message: "Succesfully inserted ",
    status: 200,
    data: employees,
    users,
  });
});

//get all data
app.get("/", (req, res) => {
  res.json({ users });
});

//get single data
app.get("/:id", (req, res) => {
  let id = req.params.id;
  let user = users.findIndex((u) => u.id == id);

  let emp = users[user];

  res.json({
    emp,
  });
});

//deelete a particular data
app.get("/del/:id", (req, res) => {
  let id = req.params.id;

  let user = users.filter((u) => u.id != id);
  res.json({ user });
});

//edit an particular data
app.get("/edit/:id", (req, res) => {
  let id = req.params.id;

  let user = users.findIndex((u) => u.id == id);

  let newUserData = {
    name: "ganesh",
  };
  if (user != -1) {
    users[user] = newUserData;
  }
  res.json({ users });
});



app.listen(2000, () => {
  console.log("server started on 2000");
});
