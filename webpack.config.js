module.exports = {  
    target: "webworker",
    //uncomment when debugging errors
    //mode: "none", 
    //uncomment when debugging errors
    entry: [ 
        "./api/index.js", 
        "./api/modules/global.js", 
        "./api/modules/fail.js",
        "./api/modules/direct_url.js",
        "./api/modules/ebay.js",
        "./api/modules/amazon.js"
    ]
};