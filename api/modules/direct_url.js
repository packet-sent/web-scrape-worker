export function direct_parse(json_parse) {
    
    var gen_url = json_parse.url
    var genned_success = "True"

    return [gen_url, genned_success]
};

export function amazon_scrape($) {
    var obj = {
        ebay_list: []
    };

    $('.s-result-item').each((i, el) => {

        $('.a-text-price').remove();

        const titles = $(el)
            .find(".a-size-medium")
            .text()
            .replace(/,/, ' ')

        const prices = $(el)
            .find(".a-offscreen")
            .text()

        if (prices !== "") {
            obj.amazon_list.push({ "title": titles, "price": prices });
        }
    });
    var json_output = JSON.stringify(obj, null, 4);
    var real_output = json_output;

    return [real_output]
};