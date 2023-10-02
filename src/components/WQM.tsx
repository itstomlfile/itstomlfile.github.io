import React, { useState, useEffect } from 'react';
import WQMApiService from '../services/WQMApiService';

type Event = {
  id: string;
  name: string;
  status: 'unlocked' | 'locked';
};



const WorkQueueManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      // Mock delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const fetchedEvents: Event[] = [
        { id: '1', name: 'Event 1', status: 'unlocked' },
        { id: '2', name: 'Event 2', status: 'locked' },
        { id: '3', name: 'Event 3', status: 'unlocked' },
      ];
  
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleLockEvent = async () => {
    if (selectedEventId) {
      try {
        await WQMApiService.lockEvent(selectedEventId);
        // Handle success, maybe refetch events or update UI in some way
      } catch (error) {
        console.error("Error locking event:", error);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  
  return (
    <div className="bg-gray-200 p-8 rounded-md shadow-md">
      <table className="min-w-full bg-white rounded-md shadow-md overflow-hidden">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="py-2 px-4 text-center">Select</th>
            <th className="py-2 px-4 text-center">Name</th>
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
              <td className="py-2 px-4 text-center">{event.name}</td>
              <td className="py-2 px-4 text-center">{event.locked ? 'Locked' : 'Unlocked'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex space-x-4">
        <button onClick={fetchEvents} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700">Refresh Events</button>
        <button onClick={handleLockEvent} disabled={!selectedEventId} className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">Toggle Lock</button>
      </div>
    </div>
  );
  
}

export default WorkQueueManagement;
