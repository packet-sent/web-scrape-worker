import { fail_gen } from './modules/fail.js';
import { fail_scrape } from './modules/fail.js';

import { ebay_gen } from './modules/ebay.js';
import { ebay_scrape } from './modules/ebay.js';
import { amazon_gen } from './modules/amazon.js';
import { amazon_scrape } from './modules/amazon.js';

const cheerio = require("cheerio")

async function crawlPage(response) {
  const {
    headers
  } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  } else if (contentType.includes("application/text")) {
    return response.text()
  } else if (contentType.includes("text/html")) {
    return response.text()
  } else {
    return response.text()
  }
}


addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
  const body = await request.json()
  const json = JSON.stringify(body)
  const json_parse = JSON.parse(json)
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }
  const site = json_parse.site


  if (site == "ebay") {
    var run_parse = ebay_gen(json_parse)
    var genned_success = run_parse[1]
  }
  else if (site == "amazon_uk") {
    var run_parse = amazon_gen(json_parse)
    var genned_success = run_parse[1]
  }
  else {
    var run_parse = fail_gen()
    var genned_success = run_parse[0]
  }


  if (genned_success == "False") {
    var run_scrape = fail_scrape()
  }
  else {
    var response = await fetch(run_parse[0], init)
    var results = await crawlPage(response)
    var $ = cheerio.load(results);
  }


  if (site == "ebay") {
    var run_scrape = ebay_scrape($)
  }
  else if (site == "amazon_uk") {
    var run_scrape = amazon_scrape($)
  }



  return new Response(run_scrape[0], {
    headers: { 'content-type': 'application/json' },
  })


}

//curl -H "Content-type: application/json" -d '{"url": "https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=car&_sacat=0&LH_TitleDesc=0&_odkw=playstation+1&_osacat=0"}' http://127.0.0.1:8787/