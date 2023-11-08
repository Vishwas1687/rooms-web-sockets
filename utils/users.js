const users=[]


const addUser=(id,username,room)=>{
     const user={id,username,room}
     users.push(user)
}

const getUser=(id)=>{
    const user=users.find(user=>user.id===id)
    return user
}

const userLeave=(id)=>{
    const index=users.findIndex(user=>user.id===id)
    if(index!==-1)
    return users.splice(index,1)[0];
}

const getRoomUsers=(room)=>{
    // console.log(room)
    const roomUsers=users.filter(user=>user.room===room)
    return roomUsers
}

module.exports={addUser,getUser,userLeave,getRoomUsers}