import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';
import { slugify } from '@shared/utilities/slugify';

import roGovSites from '@wave/sites/ro-gov-sites';
import { WaveReportItem } from '@shared/types/wave-report-item';
const sites = roGovSites;

let envPath = '../.env';
const config = dotenv.config({ path: envPath, quiet: true });
const apiKey = config.parsed?.['API_KEY'];

let output = '../src/wave';

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
let allData: WaveReportItem[] = [];

for (const { url, isBlocked } of sites) {
  if (!isBlocked) {
    console.log(`Analyzing ${url}...`);

    try {
      const response = await fetch(
        'https://wave.webaim.org/api/request?key=' +
          apiKey +
          '&reporttype=1&evaldelay=2000&url=' +
          url
      );
      if (response.ok) {
        let data: WaveReportItem = JSON.parse(await response.text());
        let timestamp = new Date().getTime();

        const isSuccessfulAnalysis = data.status.success;
        if (isSuccessfulAnalysis) {
          data.timestamp = timestamp;
          data.slug = slugify(url);
          data.favicon = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=16`;
          allData.push(data);
        }
      }

      console.log('Waiting 5 seconds...');
      await sleep(5000);
      console.log('Resuming...');
    } catch (error) {
      console.log(error, url);
    }
  }
}

console.log('Merging reports into one...');

fs.writeFileSync(`${output}/wave-all-in-one.json`, JSON.stringify(allData));
