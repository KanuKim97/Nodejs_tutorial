var express = require('express'),
    http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server is Started : ' + app.get('port'));
});

app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함')

    res.redirect('http://google.com')

});

app.use('/', function (req, res, next) {
    console.log('request processed at second middleware');

    res.writeHead('200', {
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.end('<h1>Express ' + req.user + ' Request Result</h1>');
});
var express = require('express'),
    http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server is Started : ' + app.get('port'));
});

app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함')

    res.send({name:'mike', age:25});

});

app.use('/', function (req, res, next) {
    console.log('request processed at second middleware');

    res.writeHead('200', {
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.end('<h1>Express ' + req.user + ' Request Result</h1>');
});
