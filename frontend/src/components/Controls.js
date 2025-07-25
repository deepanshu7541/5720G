import React from 'react';

export default function Controls({ state, override }) {
  const toggleLights = () => {
    override({ lights: state.lights === 'ON' ? 'OFF' : 'ON' });
  };

  const toggleWindows = () => {
    override({ windows: state.windows === 'OPEN' ? 'CLOSED' : 'OPEN' });
  };

  return (
    <div>
      <h3>Manual Override</h3>
      <button className="btn btn-primary me-2" onClick={toggleLights}>
        Toggle Lights
      </button>
      <button className="btn btn-secondary" onClick={toggleWindows}>
        Toggle Windows
      </button>
    </div>
  );
}
