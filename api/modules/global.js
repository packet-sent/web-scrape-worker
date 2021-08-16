const cheerio = require("cheerio")

export async function makeRequest(url) {
    const init = {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      }
      var response = await fetch(url, init)
      var results = await response.text()
      var $ = cheerio.load(results);
  
      return [$, results]
  
}