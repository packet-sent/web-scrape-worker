export function fail_mode() {
    var obj_fail = { "error": "Please put a valid mode" };
    var json_output = JSON.stringify(obj_fail, null, 4);
    var real_output = json_output;

    return [real_output]
};

export function fail_scrape() {
    var obj_fail = { "error": "Please put a valid site preset" };
    var json_output = JSON.stringify(obj_fail, null, 4);
    var real_output = json_output;

    return [real_output]
};