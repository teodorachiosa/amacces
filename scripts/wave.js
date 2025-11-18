import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

import roGovSites from "../src/wave/sites/ro-gov-sites.js";
const sites = roGovSites;

let envPath = "../.env";
const config = dotenv.config({ path: envPath, quiet: true });
const apiKey = config.parsed.API_KEY;

let output = "../src/wave";

const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
let allData = [];

for (const { url, isBlocked } of sites) {
  if (!isBlocked) {
    console.log(`Analyzing ${url}...`);

    const folderNameIdentifier = url
      .replace("http://", "")
      .replace("https://", "")
      .replace("/", "");
    const response = await fetch(
      "https://wave.webaim.org/api/request?key=" +
        apiKey +
        "&reporttype=1&evaldelay=2000&url=" +
        url
    );
    if (response.ok) {
      let data = await response.text();
      let timestamp = new Date().getTime();

      data = JSON.parse(data);

      const isSuccessfulAnalysis = data.status.success;
      if (isSuccessfulAnalysis) {
        data.timestamp = timestamp;
        data = JSON.stringify(data);
        allData.push(data);
      }
    }
  }

  console.log(
    "Waiting 3 seconds..."
  );
  await sleep(3000);
  console.log("Resuming...");
}

allData = `[${allData.join()}]`;
console.log("Merging reports into one...");

fs.writeFileSync(`${output}/wave-all-in-one.json`, allData);
