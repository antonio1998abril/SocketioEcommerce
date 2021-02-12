require('dotenv').config()
const express= require('express')
const mongoose =require('mongoose')
const bodyParser=require("body-parser");
const cors=require('cors')
const path = require('path')


const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

const Comments = require('./models/chatModel').Chat

//socket io
const http =require('http').createServer(app)
const io = require('socket.io')(http)

let users=[]
io.on('connection',socket=>{
    console.log(socket.id + ' connected.')

    socket.on('joinRoom',id=>{
        const user={userId:socket.id,room:id}
        const check=users.every(user=>user.userId !== socket.id)
        if (check){
            users.push(user)
            socket.join(user.room)
        }else{
            users.map(user=>{
                if(user.userId === socket.id){
                    if(user.room !== id){
                        socket.leave(user.room)
                        socket.join(id)
                        user.room=id
                    }
                }
            })
        }
        /* console.log(users)
        console.log(socket.adapter.rooms) */
    })

    socket.on('createComment',async msg=>{
        const {username,content,post_id,createdAt,rating,send}=msg
        const newComment=new Comments({
            username,content,post_id,createdAt,rating
        })

       /*  await newComment.save() */

      /*   io.to(newComment.post_id).emit('sendCommentToClient',newComment) */

      if(send === 'replyComment'){
        const {_id, username, content, post_id, createdAt, rating} = newComment

        const comment = await Comments.findById(post_id)

        if(comment){
            comment.reply.push({_id, username, content, createdAt, rating})

            await comment.save()
            io.to(comment.post_id).emit('sendReplyCommentToClient', comment)
        }
        }else{
            await newComment.save()
            io.to(newComment.post_id).emit('sendCommentToClient', newComment)
        }
    })

    socket.on('disconnect',()=>{
        console.log(socket.id+ 'disconnected')
    })
})

app.use('/api',require('./routes/postRoute'))
app.use('/api',require('./routes/commentRoute'))

//Connet to Mongo
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
http.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})