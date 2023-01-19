require('dotenv').config();
const express = require('express');
const db = require('./db/connections');
const cors = require('cors');

const http = require("http");
const { Server } = require("socket.io");

const cookieParser = require('cookie-parser');
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Importing Routes:
const authRoutes = require("./routes/auth.routes"); 
const chatRoutes = require("./routes/chat.routes"); 
const userRoutes = require("./routes/user.routes"); 


// Connecting DB :
db();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));
app.get('/', (req, res) => {
    res.send('Welcome!!!');
});

app.use('/api', authRoutes);
app.use("/api", chatRoutes);
app.use("/api", userRoutes);

// on => receiving side
// emit => sending side

io.on('connection', (socket) => {
    console.log('Socket:', socket);
    console.log('User Connected: ', socket.id);
    socket.on('join-room', (data) => {
        socket.join(data);
        console.log(`User ${socket.id} has joined the room ${data}`);
    });
    socket.on('send-message', () => {
        socket.to(data.room).emit('receive-message', data);
    });
    socket.on('disconnect', () => {
        console.log('User Disconnected: ', socket.id);
    });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})