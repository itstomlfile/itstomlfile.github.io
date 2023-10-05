class WorkQueueManagementService {
  private static BASE_URL: string = import.meta.env.VITE_WQM_URL || '/api';  // Default to '/api' if not provided

  static async fetchEvents(minutes: number = 1, limit: number = 10): Promise<any> {
    const response = await this.request(`${this.BASE_URL}/events?minutes=${minutes}&limit=${limit}`);
    return response.events || []; // return the events list or an empty list if not present
  }

  static async lockEvent(eventId: string): Promise<any> {
    return this.request(`${this.BASE_URL}/lock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'event-id': eventId })
    });
  }

  static async unlockEvent(eventId: string): Promise<any> {
    return this.request(`${this.BASE_URL}/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'event-id': eventId })
    });
  }

  static async publish(payload: any): Promise<any> {
    return this.request(`${this.BASE_URL}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  static async getEvent(eventId: string): Promise<any> {
    return this.request(`${this.BASE_URL}/get?event-id=${eventId}`);
  }

  static async editEvent(eventId: string, payload: any): Promise<any> {
    return this.request(`${this.BASE_URL}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, ...payload })
    });
  }

  static async deleteEvent(eventId: string): Promise<any> {
    return this.request(`${this.BASE_URL}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId })
    });
  }

  private static async request(url: string, options: RequestInit = {}): Promise<any> {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorData}`);
      }
      const jsonData = await response.json();
      if (jsonData.hasOwnProperty('events')) {
        return jsonData;
      } else {
        // If the expected 'events' key is not present, throw an error (or handle in a way that suits your needs)
        throw new Error('Expected "events" key not present in response.');
      }
    } catch (error) {
      console.error("Error making request:", error);
      throw error;
    }
  }
}

export default WorkQueueManagementService;
