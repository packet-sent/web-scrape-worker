import { makeRequest } from './global.js';

export function ebay_gen(json_parse) {
  if (json_parse.page > 0) {
    var page = json_parse.page
  }
  else {
    var page = 1
  }

  var gen_url = "https://www.ebay.co.uk/sch/i.html?&_nkw=" + json_parse.search + "&_pgn=" + page + "&_ipg=25"
  var genned_success = "True"

  return [gen_url, genned_success]
};

export async function ebay_scrape($) {
  var obj = {
    ebay_list: []
  };
  var out = []

  $('.s-item').each((i, el) => {
    $('.LIGHT_HIGHLIGHT').remove();

    const titles = $(el)
      .find(".s-item__title")
      .text()
      .replace(/,/, ' ');

    const price = $(el)
      .find('.s-item__price')
      .eq(0)
      .text()
      .replace(/\s\s+/g, '')
      .replace(/,/, ' ');

    const itemLink2 = $(el)
      .find(".s-item__link")
      .attr('href');

    if (titles !== "") {

      obj.ebay_list.push({ "title": titles, "price": price, "item_url": itemLink2});
      out.push(itemLink2)
    }
  });

  var itemLink = out[1]
  var json_output = JSON.stringify(obj, null, 4);
  var real_output = json_output;

  return [real_output, itemLink, out]
};

export async function ebay_scrape_item(item_link_list) {

  var obj_extend = {
    ebay_list: []
  }

  for (const item_link of item_link_list) {
    var item_scrape_load = await makeRequest(item_link)
    var runtest = await scrape_item(item_scrape_load[0])
    var obj = JSON.parse(runtest);
    obj_extend.ebay_list.push(obj)
  }

  var json_output = JSON.stringify(obj_extend, null, 4);
  var real_output = json_output;

  async function scrape_item($)  {
    var obj = {
      item: []
    };
  
    $(".g-hdn").remove();
    var itemTitle = $('.it-ttl')
        .text();
    var itemCon = $('.u-flL.condText')
        .text();
    /*not working on all item pages
    var itemConDes = $('.topItmCndDscMsg')
        .text();
    var url = $('iframe')
        .attr('src');
    */
    var item_url = $('link[rel="canonical"]')
        .attr('href');
    var price = $('.mainPrice')
        .text()
        .replace(/\s\s+/g, '')
    var sellerName = $('.mbg-nw')
        .text();
    var sellerUrl = $('.mbg')
        .find('a')
        .attr('href');
    var error = $('.error-header__headlin').length;
    
    if (error == 0)   {
      obj.item.push({ "title": itemTitle, "price": price, "item_url": item_url, "item_condition": itemCon, "seller_username": sellerName, "seller_profile_url": sellerUrl });
    }
  
    var json_output = JSON.stringify(obj, null, 4);
    var real_output = json_output;
    return real_output
  }
  
  return [json_output, real_output]
}
