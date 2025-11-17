import { join } from "path";
import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

import roGovSites from "../wave/sites/ro-gov-sites.js";
const sites = roGovSites;

let envPath = "../.env";
const config = dotenv.config({ path: envPath, quiet: true });
const apiKey = config.parsed.API_KEY;

let output = "../wave/reports";

const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
let allData = [];

for (const site of sites) {
  console.log(`Analyzing ${site}...`);

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
    if (isSuccessfulAnalysis) {
      allData.push(data);
    }

    const filename = join(output, `${filenameIdentifier}-WAVE.json`);
    if (isSuccessfulAnalysis) {
      fs.writeFileSync(filename, data);
    }
  }

  console.log(
    "Waiting 5 seconds in case this script is detected as malicious and blocked..."
  );
  await sleep(5000);
  console.log("Resuming...");
}

allData = `[${allData.join()}]`;
console.log("Merging reports into one...");
fs.writeFileSync("../wave/wave-all-in-one.json", allData);
