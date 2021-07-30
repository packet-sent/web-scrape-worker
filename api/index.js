import { fail_mode } from './modules/fail.js';
import { fail_scrape } from './modules/fail.js';

import { direct_parse } from './modules/direct_url.js'
import { ebay_gen } from './modules/ebay.js';
import { ebay_scrape } from './modules/ebay.js';
import { amazon_gen } from './modules/amazon.js';
import { amazon_scrape } from './modules/amazon.js';


const cheerio = require("cheerio")


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
  const mode = json_parse.mode
  const site = json_parse.site


  if (mode == "scrape") {
    if (site == "ebay") {
      var run_parse = ebay_gen(json_parse)
      var genned_success = run_parse[1]
    }
    else if (site == "amazon_uk") {
      var run_parse = amazon_gen(json_parse)
      var genned_success = run_parse[1]
    }
    else {
      var run_scrape = fail_scrape()
      var run_output = run_scrape[0]
      var genned_success = "False"
    }
  }
  else if (mode == "parse") {
    var run_parse = direct_parse(json_parse)
    var genned_success = run_parse[1]
  }
  else {
    var run_scrape = fail_mode()
    var run_output = run_scrape[0]
    var genned_success = "False"
  }


  if (genned_success == "True") {
    var response = await fetch(run_parse[0], init)
    var results = await response.text()
    var $ = cheerio.load(results);
  }


  var header = { headers: { 'content-type': 'application/json' }, }
  if (mode == "scrape") {
    if (site == "ebay") {
      var run_scrape = ebay_scrape($)
      var run_output = run_scrape[0]
    }
    else if (site == "amazon_uk") {
      var run_scrape = amazon_scrape($)
      var run_output = run_scrape[0]
    }
    var header = { headers: { 'content-type': 'application/json' }, }
  }
  else if (mode == "parse") {
    var run_output = results
    var header = { headers: { 'content-type': 'text/html' }, }
  }


  return new Response(run_output, header)

}