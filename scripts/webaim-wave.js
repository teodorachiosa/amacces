const join = require("path").join;
const fetch = require("node-fetch");
const fs = require("fs");
const dotenv = require("dotenv");

const roGovSites = require("../sites/ro-gov-sites.js");
const sites = roGovSites.sites;

let envPath = "../.env";
const config = dotenv.config({ path: envPath, quiet: true });
const apiKey = config.parsed.API_KEY;

let output = "../wave-reports";

const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

for (const site of sites) {
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
    const isSuccessfulAnalysis = data.status.success;
    if (isSuccessfulAnalysis) {
      data.timestamp = timestamp;
    }
    data = JSON.stringify(data);

    const filename = join(output, `${filenameIdentifier}-WAVE.json`);
    if (isSuccessfulAnalysis) {
      fs.writeFileSync(filename, data);
    }
  }

  // Wait a minute in case this script is detected as malicious and blocked
  console.log("Waiting 1 minute...");
  await sleep(60000);
  console.log("Resuming...");
}
