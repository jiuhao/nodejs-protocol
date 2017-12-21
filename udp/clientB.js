const dgram = require('dgram');
const message = Buffer.from('你好，clientA，我是clientB');

const server = dgram.createSocket('udp4');

server.on('error', err=> {
    console.log(`服务异常：${err}`);
    server.close();
});

server.on('message', (msg, rinfo)=> {
    console.log(`收到信息：${msg} 来自于 ${rinfo.address}:${rinfo.port}`);
    server.send(message, rinfo.port, rinfo.address, (err) => {
        console.log('send message');
        if(err){
            console.log(`send 异常：${err}`);
        }
    });
});

server.bind(5002);

console.log('clientB启动udp服务');