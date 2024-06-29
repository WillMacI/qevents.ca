import React, { useState } from 'react';

function CreateEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Event created:', data);
                setName('');
                setDescription('');
            })
            .catch(error => console.error('Error creating event:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Description</label>
                <div className="control">
                    <input className="input" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
            </div>
            <div className="control">
                <button type="submit" className="button is-primary">Submit</button>
            </div>
        </form>
    );
}

export default CreateEvent;
