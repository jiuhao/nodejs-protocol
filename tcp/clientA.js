const net = require('net');
const PORT = 8124;
const HOST = '127.0.0.1';
const client = new net.Socket({
    allowHalfOpen: false,
});


client.connect(PORT, HOST, ()=> {
    console.log(`连接通向->${HOST}:${PORT}`);
});

client.write(JSON.stringify({
    id: 'A',
    toId: '',
    text: '大家好，我是clientA'
}));

setInterval(()=>{
    client.write(JSON.stringify({
        id: 'A',
        toId: 'B',
        text: '你好，我是clientA'
    }));

}, 10000);

client.on('data', (data)=> {
    console.log(`来自服务器的数据:${data}`);
});

client.on('close', ()=> {
    console.log('tcp连接已关闭');
});

client.on('error', (err)=> {
    console.log(`客户端异常信息:${err}`);
});

