const Event = require('../models/eventModel');
let systemState = { lights: 'ON', windows: 'CLOSED' };

exports.receiveSensorData = async (req, res) => {
  console.log("🔥 Incoming Payload:", req.body);
  const { motion, temperature } = req.body;

  // Rule-based decisions
  systemState.lights = motion ? 'ON' : 'OFF';
  systemState.windows = temperature > 25 ? 'OPEN' : 'CLOSED';

  // Log event to DB
  const event = new Event({
    motion,
    temperature,
    lights: systemState.lights,
    windows: systemState.windows,
    timestamp: Date.now(),
  });
  try{
    console.log('✅ Event saved:', event);
    await event.save();
  }
  catch (error) {
    console.error('❌ Failed to save event:', error);
    res.status(500).json({ error: 'Failed to save event' });
  }
  // Emit update to frontend
  const io = req.app.get('socketio');
  io.emit('stateUpdate', systemState);

  res.json({ success: true, systemState });
};

exports.manualOverride = async (req, res) => {
  const { lights, windows } = req.body;
  if(lights) systemState.lights = lights;
  if(windows) systemState.windows = windows;

  // Log override event
  const event = new Event({
    motion: null,
    temperature: null,
    lights: systemState.lights,
    windows: systemState.windows,
    override: true,
    timestamp: Date.now(),
  });
  await event.save();

  const io = req.app.get('socketio');
  io.emit('stateUpdate', systemState);

  res.json({ success: true, systemState });
};
