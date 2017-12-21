const http = require('http');

const server = new http.Server();
server.on('request', (req, res)=> {
    console.log('req.url', req.url);
    //设置应答头
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write('hello ');
    res.end('server already end');
});

server.on('connection', ()=> {

});

server.on('close', ()=> {

});

server.on('error', (err)=> {
    console.log('异常信息', err);
    server.close();
});

server.listen(5200);
