import { API_ENDPOINT } from './../constants';

export class Feedback {
  static async sendBugReport(bugReport: any): Promise<void> {
    await fetch(`${API_ENDPOINT}/feedback/bugreport`, {
      body: JSON.stringify(bugReport),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  }
}
