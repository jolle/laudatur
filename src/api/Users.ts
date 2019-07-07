import { API_ENDPOINT } from './../constants';
import { setSession, getSession } from './QnA';

export class Users {
  static async createUser(user: {
    username: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> {
    return fetch(`${API_ENDPOINT}/users`, {
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(r => r.json());
  }

  static async createSession(user: {
    username: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> {
    return fetch(`${API_ENDPOINT}/users/session`, {
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(r => r.json())
      .then(r => {
        if (r.jwt) {
          setSession(r.jwt);
        }
        return r;
      });
  }

  static async addBookmark(
    questionId: string
  ): Promise<{ success: boolean; bookmarked: boolean }> {
    return fetch(`${API_ENDPOINT}/users/bookmarks`, {
      body: JSON.stringify({ questionId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getSession()}`
      },
      method: 'PATCH'
    }).then(r => r.json());
  }
}
