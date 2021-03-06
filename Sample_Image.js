var http = require('http'); //http
var fs = require('fs'); //File System

//웹 서버의 객체
var server = http.createServer();

//웹서버의 포트 번호 -> 3000번에서 대기한다,
var port = 3000;
server.listen(port, function () {
    console.log('웹서버가 시작되었습니다. : %d', port);
});

//연결이벤트
server.on('connection', function (socket) {
    var addr = socket.address();
    console.log('클라이언트 접속: %s, %d', addr.address, addr.port);
});

server.on('request', function (req, res) {
    console.log('클라이언트 요청이 들어옴');

    var filename = 'testimg.jpg';
    fs.readFile(filename, function (err, data) {
        res.writeHead(200, {
            "Content-Type": "image/jpg"
        });
        res.write(data);
        res.end();
    });
});

server.on('close', function () {
    console.log('서버 종료');
});
