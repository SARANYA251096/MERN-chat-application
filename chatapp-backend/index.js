require('dotenv').config();
const express = require('express');
const db = require('./db/connections');
const cors = require('cors');
const app = express();

// Importing Routes:
const authRoutes = require("./routes/auth.routes"); 
const chatRoutes = require("./routes/chat.routes"); 


// Connecting DB :
db();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Welcome!!!');
});

app.use('/api', authRoutes);
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})