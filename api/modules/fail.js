export function fail_gen() {
    var genned_success = "False"

    return [genned_success]
};

export function fail_scrape() {
    var obj_fail = { "error": "Please put a valid site preset" };
    var json_output = JSON.stringify(obj_fail);
    var real_output = json_output;

    return [real_output]
};