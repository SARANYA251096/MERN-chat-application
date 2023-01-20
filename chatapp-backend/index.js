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

chatRoutes(io);

app.use('/api', authRoutes);
app.use("/api", userRoutes);

// on => receiving side
// emit => sending side

// require('./routes/chat.routes')(io);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})