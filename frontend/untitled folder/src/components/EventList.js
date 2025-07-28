import React from 'react';

export default function EventList({ events }) {
  return (
    <div>
      <h3>Recent Events</h3>
      <ul className="list-group">
        {events.map((evt, idx) =>
          <li key={idx} className="list-group-item">
            Lights: {evt.lights}, Windows: {evt.windows} {evt.override ? "(Manual)" : ""}
          </li>
        )}
      </ul>
    </div>
  );
}
