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
    var infile = fs.createReadStream(filename, {flags: 'r'});
    var filelength = 0;
    var curlength = 0;

    fs.stat(filename, function (err, stats) {
        filelength = stats.size;
    });

    //헤더쓰기
    res.writeHead(200, {"Content-Type": "image/jpg"});

    //파일 내용을 스트림에서 읽어 본문쓰기
    infile.on('readable', function () {
        var chunk;
    
        while (null != (chunk = infile.read())) {
            console.log('읽어 들인 데이터 크기: %d 바이트', chunk.length);
            curlength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
                console.log('파일 부분 쓰기 완료 : %d, 파일 크기 : %d', curlength, filelength);
                if (curlength >= filelength) {
                    //응답 전송하기
                    res.end();
                }
            });
        }
    });

});

server.on('close', function () {
    console.log('서버 종료');
});
