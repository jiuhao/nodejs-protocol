const net = require('net');
const PORT = 8124;

//客户端列表
let clientList = [];

const server = net.createServer();

server.on('connection', (conn)=> {
    conn.name = `客户端${conn.remoteAddress}:${conn.remotePort}`;
    conn.write('与tcp服务器连接成功');
    clientList.push(conn);
    conn.on('data', (data)=> {
        data = JSON.parse(data);
        conn.id = data.id;
        if (data.toId) {
            push(data, conn);
        } else {
            broadcast(data, conn);
        }
    });
    conn.on('end', ()=> {
        clientList.splice(clientList.indexOf(conn), 1);
    });
});

server.on('error', (err)=> {
    console.log(`服务端异常信息：${err}`);
    throw err;
});

server.listen(PORT, '0.0.0.0', ()=> {
    console.log(`服务器已启动:${JSON.stringify(server.address())}`);
});


setInterval(()=> {
    console.log('*******00000000*******');
    for (let i = 0; i < clientList.length; i++) {
        console.log(clientList[i].name, clientList[i].id);
    }
    console.log('*******11111111*******');
}, 3000);

//广播
function broadcast(data, conn) {
    for (let i = 0; i < clientList.length; i++) {
        if (conn !== clientList[i]) {
            clientList[i].write(`${conn.name} says ${data.text}`);
        }
    }
}
//一对一
function push(data, conn) {
    for (let i = 0; i < clientList.length; i++) {
        if (data.toId === clientList[i].id) {
            clientList[i].write(`${conn.name} says ${data.text}`);
            break;
        }
    }
}