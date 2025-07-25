const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(express.json());

const sensorRoutes = require('./routes/sensors');
app.use('/api/sensors', sensorRoutes);

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/lumosense', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://mongo:27017/lumosense', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));


app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 4000;

// // ✅ Middleware — ORDER matters!
// app.use(cors()); // Allow cross-origin requests
// app.use(bodyParser.json()); // Parse incoming JSON

// // Temporary state
// let systemState = {
//   lights: "ON",
//   windows: "CLOSED",
//   lastSensorData: null,
// };

// app.post('/api/sensors', (req, res) => {
//   console.log("➡️ Headers:", req.headers);
//   console.log("➡️ Body:", req.body);

//   const { motion, temperature } = req.body;

//   if (typeof motion !== "boolean" || typeof temperature !== "number") {
//     console.log("❌ Invalid data format received!");
//     return res.status(400).json({ error: "Invalid payload format" });
//   }

//   systemState.lights = motion ? "ON" : "OFF";
//   systemState.windows = temperature > 25 ? "OPEN" : "CLOSED";
//   systemState.lastSensorData = { motion, temperature, timestamp: new Date() };

//   return res.json({ status: "success", systemState });
// });

// app.get('/api/state', (req, res) => {
//   res.json(systemState);
// });

// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });