Salespush.destroy({
  truncate: true,
});

try {
  let apikey =
    "3AC2356C8E9EEDD645F8A27700A65EBDCB78DFF709C47BB2EE5FCB92C360ED56C1E2B275380B5026F3114E4B24F823EF";
  //make request to send message API with token in header
  const response = await axios({
    method: "POST",
    url: `https://api.elasticemail.com/v2/campaign/list`,
    headers: {
      "X-ElasticEmail-ApiKey": `${apikey}`,
    },
  });

  const { data } = response.data;

  let names = [];

  for (let i = 0; i < data.length; i++) {
    let a = data[i].name.split(" ");
    names.push(data[i].name);
  }

  let final = [];

  for (let i = 0; i < names.length; i++) {
    var uri = ` https://api.elasticemail.com/v2/log/summary?from=2021-09-29&to=2021-09-30&channelName=${names[1]}`;
    // console.log(uri);
    const res = await axios({
      method: "POST",
      url: `https://api.elasticemail.com/v2/log/summary?from=2021-09-29&to=2021-09-30&channelName=${names[1]}`,
      headers: {
        "X-ElasticEmail-ApiKey": `${apikey}`,
      },
    });

    console.log(res.data);
    const { logstatussummary } = res.data.data;
    let obj = {};
    obj.assetID = "PROD024";
    obj.potentialBuyers = logstatussummary.clicked;
    obj.leadGenerators = logstatussummary.delivered;
    obj.campaignName = names[i];

    final.push(obj);
  }
  let emailsData = await Salespush.bulkCreate(final);

  console.log(emailsData);
  console.log(names, final);
  res.json({ obj: response.data });
 
} catch (error) {
  return res.status(500).json(error.message);
}
