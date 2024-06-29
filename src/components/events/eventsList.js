import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../services/apiService'; // Adjust the path as necessary

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents().then(data => setEvents(data));
    }, []);

    return (
        <section class="section">
            <div class="content">
                <div>
                    <h1>Events</h1>
                    <hr></hr>
                    <ul>
                        {events.map(event => (
                            <li key={event.uuid}>{event.title}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </section>

    );
}

export default Events;
