import React, { useState, useEffect } from 'react';
import WorkQueueManagementService from '../services/WorkQueueManagementService';

type Event = {
  id: string;
  name: string;
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
      };
      await WorkQueueManagementService.publish(newEvent);
      setEventName(''); // Clear the input after publishing
      fetchEvents(); // Refresh the list of events
    } catch (error) {
      console.error("Error publishing event:", error);
    }
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
      <div className="mb-4">
        <label htmlFor="eventName" className="block text-gray-700">Event Name:</label>
        <input 
          type="text" 
          id="eventName" 
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
          className="mt-1 border rounded-md px-2 py-1 w-full"
        />
        <button 
          onClick={handlePublishEvent} 
          className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          Publish New Event
        </button>
      </div>
      <table className="min-w-full bg-white rounded-md shadow-md overflow-hidden">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="py-2 px-4 text-center">Select</th>
            <th className="py-2 px-4 text-center">Event ID</th>
            <th className="py-2 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex space-x-4">
        <button onClick={handleLockEvent} disabled={!selectedEventId} className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">Toggle Lock</button>
      </div>
    </div>
  );
}

export default WorkQueueManagement;
