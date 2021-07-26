//const url = "https://example.com"

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
  
  return new Response(results, {
    headers: { 'content-type': 'text/plain' },
  })
}

//curl -H "Content-type: application/json" -d '{"url": "https://speedproxies.net"}' http://127.0.0.1:8787/