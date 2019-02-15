import io from 'socket.io-client'

const socket = io('ws://localhost:9000');

socket.on('receiveMsg', function (data) {
  console.log('浏览器接收消息',data);
})

socket.emit('sendMsg', {name: '12', data: Date.now()})
console.log('发送消息');
