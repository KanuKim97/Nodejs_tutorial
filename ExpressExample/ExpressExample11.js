var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    static = require('serve-static'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

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
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

app.use('/public', static(path.join(__dirname, 'public')));

router.route('/process/login').post(function (req, res) {
    console.log('/process/login 호출됨');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if (req.session.user) {
        console.log('이미 로그인 되어 상품페이지로 이동합니다.');

        res.redirect('/public/product.html');
    } else {
        req.session.user = {
            id: paramId,
            name: 'James',
            authorized: true
        };

        res.writeHead('200', {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id' + paramId + '</p></div>');
        res.write('<div><p>Param PW' + paramPassword + '</p></div>');
        res.write("<br><br><a href='/process/product'> 상품페이지로 이동하기</a>");
        res.end();
    }
});

router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout 호출됨');

    if (req.session.user) {
        console.log('로그아웃 합니다.');

        req.session.destroy(function (err) {
            if (err) {
                throw err;
            }

            console.log('세션을 삭제한 후 로그아웃 되었습니다.');
            res.redirect('/public/login2.html');
        });
    } else {
        console.log('로그인 되어있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});

router.route('/process/users/:id').get(function (req, res) {
    console.log('/process/users/:id 를 처리함');

    var paramId = req.params.id;

    console.log('/process/users와 토큰 %s를 이용해 처리함', paramId);

    res.writeHead('200', {
        'Content-Type': 'text/html; charset=utf8'
    });
    res.write('<h1>Express서버에서 응답한 결과입니다</h1>');
    res.write('<div><p>Param id :' + paramId + '</p></div>');
    res.end();
});

router.route('/process/showCookie').get(function (req, res) {
    console.log('/process/showCookie 호출됨');

    res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function (req, res) {
    console.log('/process/setUserCookie 호출됨');

    res.cookie('user', {
        id: 'mike',
        name: 'james',
        authorized: true
    });

    res.redirect('/process/showCookie');
});

router.route('/process/product').get(function (req, res) {
    console.log('/process/product 호출됨');

    if (req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
});

app.use('/', router);

app.all('*', function (req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다</h1>');
});