var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)



io.on('connect', socket => {
    console.log('A user connected')

    socket.on('chat message', msg => {
        // console.log('message ' + JSON.stringify(msg))
        socket.emit('chat message', msg)
        socket.broadcast.emit('chat message', msg)
    })
})

http.listen(3001, () => {
    console.log('---Server Online!--- localhost:3001')
})