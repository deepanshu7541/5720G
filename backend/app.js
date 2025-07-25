const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sensorRoutes = require('./routes/sensors');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/lumosense', { useNewUrlParser: true, useUnifiedTopology: true });

// Socket.io middleware to emit updates
app.set('socketio', io);

// Routes
app.use('/sensors', sensorRoutes);

server.listen(4000, () => console.log('Backend running on port 4000'));