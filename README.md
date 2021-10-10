# 👷 `WIP Cloudflare Worker Scraper` 

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/packet-sent/web-scrape-worker)

[`index.js`](https://github.com/speedproxies/web-scrape-worker/blob/master/api/index.js) has the main content of the Cloudflare Workers script.

# Running the Cloudflare Workers script

To run the Cloudflare Workers script you need to create a Cloudflare/Workers [account](https://dash.cloudflare.com/sign-up/workers).

Then you will have to pay for the Workers paid plan which is about $5 a month (this unlocks more CPU time which is needed for scraping).

After getting a paid plan you will have to install a CLI tool to deploy your Cloudflare Workers script, in this case we are going to be using wrangler which lets us generate, configure, build, preview, publish our Cloudflare Workers script.
You can use npm to install wrangler or yarn.
```bash
npm install -g @cloudflare/wrangler
```
```bash
yarn global add @cloudflare/wrangler
```
To verify you have installed it successfully you can then type ``wrangler --version`` to verify its installed successfully.
![](https://cdn.discordapp.com/attachments/683383222578839626/876963333583015976/unknown.png)

After we will have to login to our Cloudflare account on wrangler so it can get our API token to manage our Cloudflare Worker.
Type the command ``wrangler login`` and you should get an option to login via your browser, after loggin in you will be asked to authorize the API key for wrangler.

Now you can git clone my repo and run ``wrangler dev`` to run the script in development mode which will give you logs in your terminal:
```
wrangler dev
```

There is more functions to wrangler which you can find out about below:

-[Wrangler](https://github.com/cloudflare/wrangler) GitHub repo

-[Wrangler](https://developers.cloudflare.com/workers/tooling/wrangler) further documentation with examples

# Testing the Cloudflare Workers script

To test the Cloudflare Workers script I suggest using something like [Postman](https://www.postman.com/downloads/) which is an easy to use API dev tool that lets you send requests very easily for testing purposes.

We will start by creating a request by clicking the ``+`` symbol:

![](https://cdn.discordapp.com/attachments/683383222578839626/876966635385278474/unknown.png)

Then we will setup the request by putting in the following URL in the box ``http://127.0.0.1:8787`` (this is our localhost listening URL for our dev mode). Also we will be putting in our header as ``Content-type: application/json`` so that our script can process our request with the values we send in the JSON.

![](https://cdn.discordapp.com/attachments/683383222578839626/876968886149476352/unknown.png)

![](https://cdn.discordapp.com/attachments/683383222578839626/876967711308124210/unknown.png)

Then in the body section we have 4 types of request you can make:

-Mode (``scrape`` will use our presets for sites, ``parse`` will just grab the site and output it in plain HTML)

-Site (``ebay`` will just scrape ebay search titles/prices/item links, ``ebay_extend`` will do the same as the previous one but also get the item's condition/seller's name/seller's profile link, ``amazon`` will just scrape amazon search titles/prices)

-Url (You can put any URL and it will parse the plain HTML code)

![](https://cdn.discordapp.com/attachments/683383222578839626/876971842127147028/unknown.png)
![](https://cdn.discordapp.com/attachments/683383222578839626/876971947886538832/unknown.png)
![](https://cdn.discordapp.com/attachments/683383222578839626/876972007152054323/unknown.png)
![](https://cdn.discordapp.com/attachments/683383222578839626/876972123430723664/unknown.png)
