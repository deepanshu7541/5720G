import React from 'react';

export default function Dashboard({ state }) {
  return (
    <div>
      <h3>Current Status</h3>
      <p>Lights: <b>{state.lights}</b></p>
      <p>Windows: <b>{state.windows}</b></p>
    </div>
  );
}
