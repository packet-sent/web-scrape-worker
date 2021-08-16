import { fail_mode } from './modules/fail.js';
import { fail_scrape } from './modules/fail.js';

import { makeRequest } from './modules/global.js';

import { direct_parse } from './modules/direct_url.js'
import { ebay_gen } from './modules/ebay.js';
import { ebay_scrape } from './modules/ebay.js';
import { ebay_scrape_item } from './modules/ebay.js';
import { amazon_gen } from './modules/amazon.js';
import { amazon_scrape } from './modules/amazon.js';

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const body = await request.json()
  const json = JSON.stringify(body)
  const json_parse = JSON.parse(json)
  const mode = json_parse.mode
  const site = json_parse.site

  if (mode == "scrape") {
    if (site == "ebay") {
      var run_parse = ebay_gen(json_parse)
      var run_request = await makeRequest(run_parse[0])
    }
    else if (site == "ebay_extend") {
      var run_parse = ebay_gen(json_parse)
      var run_request = await makeRequest(run_parse[0])
    }
    else if (site == "amazon") {
      var run_parse = amazon_gen(json_parse)
      var run_request = await makeRequest(run_parse[0])
    }
    else {
      var run_scrape = fail_scrape()
      var run_output = run_scrape[0]
    }
  }
  else if (mode == "parse") {
    var run_parse = direct_parse(json_parse)
    var run_request = await makeRequest(run_parse[0])
  }
  else {
    var run_scrape = fail_mode()
    var run_output = run_scrape[0]
  }

  var header = { headers: { 'content-type': 'application/json' }, }
  if (mode == "scrape") {
    if (site == "ebay") {
      var run_scrape = await ebay_scrape(run_request[0])
      var run_output = run_scrape[0]
    }
    else if (site == "ebay_extend") {
      var run_scrape = await ebay_scrape(run_request[0])
      var item_link_list = run_scrape[2]
      var run_scrape_item = await ebay_scrape_item(item_link_list)
      var run_output = run_scrape_item[0]
    }
    else if (site == "amazon") {
      var run_scrape = amazon_scrape(run_request[0])
      var run_output = run_scrape[0]
    }
    var header = { headers: { 'content-type': 'application/json' }, }
  }
  else if (mode == "parse") {
    var run_output = run_request[1]
    var header = { headers: { 'content-type': 'text/html' }, }
  }

  return new Response(run_output, header)
}
