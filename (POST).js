var http = require('http');

var opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {}
};

var resData = '';
var req = http.request(opts, function (res) {
    res.on('data', function (chunk) {
        resData += chunk;
    });
    
    res.on('end', function(){
       console.log(resData); 
    });
});

opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = "q=actor";
opts.headers['Content-Length'] = req.data.length;

req.on('error', function(err){
    console.log("Error: " + err.message);
});

req.write(req.data);
req.end();