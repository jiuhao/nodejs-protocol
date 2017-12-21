const dgram = require('dgram');
const message = Buffer.from('hello clientB, i am client A');

const client = dgram.createSocket('udp4');

client.on('error', err=> {
    console.log(`服务异常：${err}`);
    client.close();
});

//A->B
setInterval(function () {
    client.send(message, 5002, 'localhost', (err) => {
        console.log('send message');
        if (err) {
            console.log(`send 异常：${err}`);
        }
    });
}, 3000);

client.on('message', (msg, rinfo)=> {
    console.log(`收到信息：${msg} 来自于 ${rinfo.address}:${rinfo.port}`);
});


client.bind(5001);
console.log('clientA 启动');