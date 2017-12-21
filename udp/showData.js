//解析udp的data数据
function show(value) {
    value = value.split(':');
    let arr = [];
    for (let i = 0; i < value.length; i++) {
        arr.push(+('0x' + value[i]));
    }

    console.log(Buffer.from(arr).toString());
}
//eg:
show('e4:bd:a0:e5:a5:bd:ef:bc:8c:63:6c:69:65:6e:74:41:ef:bc:8c:e6:88:91:e6:98:af:63:6c:69:65:6e:74:42');