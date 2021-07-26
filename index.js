//const url = "https://example.com"
const cheerio = require("cheerio")
var obj = {
  ebay_list: []
};

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
  const response = await fetch(json_parse.url, init) 
  const results = await crawlPage(response)

  const $ = cheerio.load(results);


    $('.s-item').each((i, el) => {
      $('.LIGHT_HIGHLIGHT').remove();

      const titles = $(el)
      .find(".s-item__title")
      .text()
      .replace(/,/,' ')
      //.replace(remove, '')

      const price = $(el)
      .find('.s-item__price')
      .eq(0)
      .text()
      .replace(/\s\s+/g, '')
      .replace(/,/,' ');

      if (titles  === "") {
          console.log("Removing empty value")
      }
      else {
          obj.ebay_list.push({"title": titles, "price": price});
          console.log(titles, price)
      }
    });
    
  const json_output = JSON.stringify(obj);
  
  const real_output = json_output;
  
  obj = {
    ebay_list: []
  };

  return new Response(real_output, {
    headers: { 'content-type': 'text/plain' },
  })

  
}

//curl -H "Content-type: application/json" -d '{"url": "https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=car&_sacat=0&LH_TitleDesc=0&_odkw=playstation+1&_osacat=0"}' http://127.0.0.1:8787/