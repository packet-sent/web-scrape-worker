module.exports = {  
    target: "webworker", 
    entry: [ 
        "./api/index.js", 
        "./api/modules/ebay.js",
        "./api/modules/amazon.js"
    ]
};