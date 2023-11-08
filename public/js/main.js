const messageContainer=document.querySelector('.chat-messages')
const messageForm=document.querySelector('#chat-form')
const chatMessages=document.querySelector('.chat-messages')
const leaveBtn=document.querySelector('#leave-btn')
const roomUsers=document.querySelector('#users')
const roomName=document.querySelector('#room-name')

const socket=io()



//Fetch the URL parameters

const {username,room}=Qs.parse(location.search,{
ignoreQueryPrefix:true
})

socket.emit('join-room',{username,room})

socket.on('message',(message)=>{
    displayMessage(message)

    chatMessages.scrollTop=chatMessages.scrollHeight
})

const displayMessage=(message)=>{
    const singleMessageContainer=document.createElement('div')
    singleMessageContainer.classList.add('message')
    singleMessageContainer.innerHTML=`
    <p class="Meta">${message.username} <span>${message?.time}</span></p>
      <p class="Text">  
          ${message.text}
      </p>
    `
    messageContainer.append(singleMessageContainer)
}

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message=e.target.elements.msg.value
    socket.emit('send-message',message)
    messageForm.elements.msg.value=''
})

leaveBtn.addEventListener('click',()=>{
    socket.emit('disconnect')
})

socket.on('room-users',({room,users})=>{
    console.log(users)
    roomUsersFunc(users)
    userRoomFunc(room)
})

const roomUsersFunc=(users)=>{
    roomUsers.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    roomUsers.appendChild(li);
  });
}

const userRoomFunc=(room)=>{
    roomName.innerHTML=`${room}`
}

