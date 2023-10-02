class WQMApiService {
    static async fetchEvents() {
      try {
        const response = await fetch('/api/events'); // replace with your API endpoint
        return response.json();
      } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
    }
  
    static async lockEvent(eventId: string) {
      try {
        const response = await fetch(`/api/events/${eventId}/lock`, {
          method: 'POST',
          // Add headers, and other configuration if needed
        });
        return response.json();
      } catch (error) {
        console.error("Error locking event:", error);
        throw error;
      }
    }
  }
  
  export default WQMApiService;
  