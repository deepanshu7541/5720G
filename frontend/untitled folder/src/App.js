import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import Dashboard from './components/Dashboard';
import Controls from './components/Controls';
import EventList from './components/EventList';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:4000');
// const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [state, setState] = useState({lights: 'OFF', windows: 'CLOSED'});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.on('stateUpdate', (data) => {
      setState(data);
      setEvents(evts => [data, ...evts].slice(0, 10));
    });
  }, []);

  const sendOverride = (newState) => {
    fetch('http://localhost:4000/sensors/override', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newState)
    });
  }

  return (
    <div className="container mt-3">
      <h1>LumoSense Dashboard</h1>
      <Dashboard state={state} />
      <Controls state={state} override={sendOverride} />
      <EventList events={events} />
    </div>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
