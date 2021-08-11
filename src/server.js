import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import likesRouter from './routes/likesRoute.js';
import messageRouter from './routes/messageRouter.js';
import {Server} from 'socket.io';
import http from 'http';
import {userJoin, userLeave} from './utils/users.js';
import pkg from 'pg';
import { users } from './utils/users.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//added versioning to routes
app.use('/api/v1', likesRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/users', userRouter)
app.use('/api/v1', messageRouter)


const {Pool} = pkg;

export const pool = new Pool();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const port = process.env.PORT || 6000;
let count = 0

io.on("connection", (socket) =>{
    console.log("New user connected");
    console.log(count++);
    const blankPayLoad = {message: 'blankPayLoad'}; 
    // socket.emit("connected", blankPayLoad) //To signal to front end client that user has connection
    //save user and socket id
    socket.on("openChat", ({userName, userId}) => {
        console.log('open chat');
        userJoin(socket.id, userName, userId);
        console.log(users);
    })

    socket.on("sendMessage", (data) => {
       const {sender, receiver, ch, createdAt, readState} = data;
        const socketId = getUserSocket(data.receiver); //to socket
        if(socketId){
            io.to(socketId).emit("newMessage", data);  
        }
        try {
            // let result = await pool.query('INSERT into messages (sender, receiver, ch, createdAt, readState) VALUES ($1, $2, $3, $4, $5) RETURNING *', [sender, receiver, ch, createdAt, readState]);
            console.log("db query")
        } catch(e){
                console.log(e);
        }
    })

    socket.on("disconnect", (userId) => {
        console.log('disconnected');
        userLeave(userId)
        console.log(users);
    })

    if(count === 1){
        setTimeout(() => {
            socket.emit("newMessage", blankPayLoad)
        }, 3000)
    }
    
})


server.listen(port, () => {
    console.log(`http server is listening at port ${port}`);
})





export default app;
