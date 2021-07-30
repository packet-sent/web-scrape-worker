export function ebay_gen(json_parse) {
  if (json_parse.page > 0) {
    var page = json_parse.page
  }
  else {
    var page = 1
  }

  var gen_url = "https://www.ebay.co.uk/sch/i.html?&_nkw=" + json_parse.search + "&_pgn=" + page + "&_ipg=200"
  //var gen_url = "https://httpbin.org/ip?json"
  var genned_success = "True"

  return [gen_url, genned_success]
};

export function ebay_scrape($) {
  var obj = {
    ebay_list: []
  };

  $('.s-item').each((i, el) => {
    $('.LIGHT_HIGHLIGHT').remove();

    const titles = $(el)
      .find(".s-item__title")
      .text()
      .replace(/,/, ' ')
    //.replace(remove, '')

    const price = $(el)
      .find('.s-item__price')
      .eq(0)
      .text()
      .replace(/\s\s+/g, '')
      .replace(/,/, ' ');

    if (titles !== "") {
      obj.ebay_list.push({ "title": titles, "price": price });
    }
  });
  var json_output = JSON.stringify(obj);
  var real_output = json_output;

  return [real_output]
};