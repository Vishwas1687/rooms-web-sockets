const express=require('express')
const http=require('http')
const app=express()
const path=require('path')
const socketio=require('socket.io')
const formatMessage=require('./utils/messages.js')
const {addUser,getUser, userLeave,getRoomUsers}=require('./utils/users.js')
app.use(express.static(path.join(__dirname,'public')))

const server=http.createServer(app)
const io=socketio(server)

const chatBot='ChatCord'
io.on('connection',(socket)=>{

   socket.on('join-room',(user)=>{
    socket.join(user.room)

    addUser(socket.id,user.username,user.room)
    const User=getUser(socket.id)
    socket.to(User?.room).emit('message',formatMessage(chatBot,`${User?.username} has entered the chat`))
    const users=getRoomUsers(User?.room)
    const room=User?.room
    io.to(User?.room).emit('room-users',{room:room,users:users})
   })

    

    socket.on('disconnect',()=>{
    const User=userLeave(socket.id)
    socket.to(User?.room).emit('message',formatMessage(chatBot,`${User?.username} has left the chat`))
    const users=getRoomUsers(User?.room)
    const room=User?.room
    io.to(User?.room).emit('room-users',{room:room,users:users})
   })

   socket.on('send-message',(message)=>{
    const User=getUser(socket.id)
    io.to(User?.room).emit('message',formatMessage(User?.username,message))
   })



   
})

const PORT=3000
server.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})