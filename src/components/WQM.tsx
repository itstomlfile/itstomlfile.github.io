import React, { useState, useEffect } from 'react';
import WorkQueueManagementService from '../services/WorkQueueManagementService';

type Event = {
  id: string;
  name: string
  timestamp: string;
  status: 'unlocked' | 'locked';
};

const WorkQueueManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await WorkQueueManagementService.fetchEvents();
      if (Array.isArray(fetchedEvents)) {
        setEvents(fetchedEvents);
      } else {
        console.error("Fetched events is not an array:", fetchedEvents);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleLockEvent = async () => {
    if (selectedEventId) {
      try {
        await WorkQueueManagementService.lockEvent(selectedEventId);
        setTimeout(fetchEvents, 1000);
      } catch (error) {
        console.error("Error locking event:", error);
      }
    }
  };

  const handlePublishEvent = async () => {
    try {
      const newEvent: Omit<Event, 'id'> = {
        name: eventName,
        status: 'unlocked', // Default status for new events
        timestamp: new Date().toISOString()  // Adding the timestamp
      };
      await WorkQueueManagementService.publish(newEvent);
      setEventName(''); // Clear the input after publishing
      fetchEvents(); // Refresh the list of events
    } catch (error) {
      console.error("Error publishing event:", error);
    }
  };

  const handleEditEvent = async (name: string) => {
    if (selectedEventId) {
      try {
        const updatedEvent = {
          name
        };
        await WorkQueueManagementService.editEvent(selectedEventId, updatedEvent);
        fetchEvents();
      } catch (error) {
        console.error("Error editing event:", error);
      }
    }
  };
  
  const handleDeleteEvent = async () => {
    if (selectedEventId) {
      try {
        await WorkQueueManagementService.deleteEvent(selectedEventId);
        setSelectedEventId(null);
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };
  

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // This will format the date based on the user's locale
  };

  useEffect(() => {
    fetchEvents();

    // Set an interval to fetch events every second
    const intervalId = setInterval(() => {
      fetchEvents();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="bg-gray-200 p-8 rounded-md shadow-md">
      <div className="mb-8">
        <label htmlFor="eventName" className="block text-gray-700">Event Name:</label>
        <input 
          type="text" 
          id="eventName" 
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
          className="mt-1 border rounded-md px-2 py-1 w-full"
        />
        <div className="mt-4 flex space-x-4 justify-center">
          <button 
            onClick={handlePublishEvent} 
            className="mt-2 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            Publish New Event
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white rounded-md shadow-md overflow-hidden">
      <thead className="bg-gray-900 text-white">
        <tr>
          <th className="py-2 px-4 text-center">Select</th>
          <th className="py-2 px-4 text-center">Event ID</th>
          <th className="py-2 px-4 text-center">Status</th>
          <th className="py-2 px-4 text-center">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {events.length === 0 ? (
          <tr>
            <td colSpan={4} className="py-2 px-4 text-center text-gray-700">No events.</td>
          </tr>
        ) : (
          events.map(event => (
            <tr key={event.id} className="border-t border-gray-300">
              <td className="py-2 px-4 text-center">
                <input
                  type="radio"
                  name="selectedEvent"
                  value={event.id}
                  checked={selectedEventId === event.id}
                  onChange={() => setSelectedEventId(event.id)}
                  className="focus:ring-gray-500"
                />
              </td>
              <td className="py-2 px-4 text-center">{event.id}</td>
              <td className="py-2 px-4 text-center">{event.status === 'locked' ? 'locked' : 'unlocked'}</td>
              <td className="py-2 px-4 text-center">{formatDate(event.timestamp)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
      <div className="mt-4 flex space-x-4 justify-center">
        <button onClick={handleLockEvent} disabled={!selectedEventId} className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">Lock Selected Event</button>
        <button onClick={() => handleEditEvent(eventName)} disabled={!selectedEventId} className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800">Edit Selected Event</button>
        <button onClick={handleDeleteEvent} disabled={!selectedEventId} className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800">Delete Selected Event</button>
      </div>
    </div>
  );
}

export default WorkQueueManagement;
