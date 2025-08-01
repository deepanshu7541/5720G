# LumoSense 🌞  
A context-aware smart lighting and ventilation management system built using MERN (MongoDB, Express, React, Node.js), Node-RED for virtual sensor simulation, and Docker Compose for full-stack deployment.

## 🔍 Overview

LumoSense simulates a smart room environment that automatically adjusts lights and windows based on real-time motion and temperature data. With virtual sensors, automation rules, user control, and live logging, it's an ideal prototype for energy-aware intelligent environments.


## 🧩 Features

- 🧠 Rule-based automation:
  - Lights ON/OFF based on motion
  - Windows OPEN/CLOSED based on temperature
- 🌐 Real-time dashboard using React + Socket.IO
- 🧪 Sensor simulation with Node-RED (virtual, no hardware)
- 📊 Event logging to MongoDB
- 🛠 Fully containerized with Docker Compose
- 🕹️ Manual override control for lights and windows

## 🛠️ Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Simulation    | Node-RED                          |
| Backend       | Node.js, Express.js, Socket.IO    |
| Database      | MongoDB, Mongoose                 |
| Frontend      | ReactJS, Bootstrap, Socket.IO     |
| Communication | RESTful APIs, WebSockets          |
| Deployment    | Docker, Docker Compose            |

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Git

### Clone & Launch the Project

git clone https://github.com/deepanshu7541/5720G.git 
cd 5720G 
docker-compose up –build


### App URLs

| Component    | URL                        |
|--------------|----------------------------|
| Dashboard UI | http://localhost:3000      |
| Node-RED UI  | http://localhost:1880      |
| Backend API  | http://localhost:4000      |
| Database     | Connected via Docker (MongoDB)

## 📄 API Endpoints

### POST /sensors
Receives a sensor payload:
{ 
“motion”: true, 
“temperature”: 27.5 
}


### POST /sensors/override
Override automation state via frontend:
{ 
“lights”: “ON”, 
“windows”: “CLOSED” 
}


## 🧪 Simulation & Testing

- 🔁 Node-RED injects motion & temperature every 5s
- 📥 Express backend applies automation rules
- 🧾 Events saved in MongoDB
- 🚨 State updates sent to frontend in real time
- 🧪 Manual test cases run via Postman or curl



