var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    static = require('serve-static');

var app = express();

var router = express.Router();

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server is Started : ' + app.get('port'));
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

router.route('/process/login/:name').post(function (req, res) {
    console.log('/process/login/:name 처리함');

    var paramName = req.params.name;

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password;

    res.writeHead('200', {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.write('<h1>Express서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param-Name:' + paramName + '</p></div>');
    res.write('<div><p>Param-Id:' + paramId + '</p></div>');
    res.write('<div><p>Param-Password:' + paramPassword + '</p></div>');
    res.write("<br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});

app.use('/', router)
