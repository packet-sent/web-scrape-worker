export function amazon_gen(json_parse) {
    if (json_parse.page > 0) {
        var page = json_parse.page
    }
    else {
        var page = 1
    }

    var gen_url = "https://www.amazon.co.uk/s?k=" + json_parse.search + "&page=" + page
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