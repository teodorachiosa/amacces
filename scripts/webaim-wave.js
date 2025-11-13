const join = require("path").join;
const fetch = require("node-fetch");
const fs = require("fs");
const dotenv = require("dotenv");

const roGovSites = require("../sites/ro-gov-sites.js");
const sites = roGovSites.sites;

let envPath = "../.env";
const config = dotenv.config({ path: envPath });
const apiKey = config.parsed.API_KEY;

let output = "../wave-reports";

const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

sites.forEach(async (site) => {
  const filenameIdentifier = site.replace(/.+\/\/|www.|\..+/g, "");
  const response = await fetch(
    "https://wave.webaim.org/api/request?key=" +
      apiKey +
      "&reporttype=1&evaldelay=2000&url=" +
      site
  );
  if (response.ok) {
    let data = await response.text();

    let timestamp = new Date().getTime();

    data = JSON.parse(data);
    data.timestamp = timestamp;
    data = JSON.stringify(data);

    const filename = join(output, `${filenameIdentifier}-WAVE.json`);
    fs.writeFileSync(filename, data);
  }

  await sleep(2000);
});
