import { API_ENDPOINT } from '../constants';
import { useState, useEffect } from 'react';

export enum QuestionType {
  FREEFORM = 'FREEFORM',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHEMISTRY_BALANCED_EQUATIONS = 'CHEMISTRY_BALANCED_EQUATIONS',
  NUMBER = 'NUMBER',
  FILLABLE_TABLE = 'FILLABLE_TABLE',
}

export interface MultipleChoiceOption {
  text: string;
  correct?: boolean;
}

export interface SingleQuestion {
  _id: string;

  question: string;
  type: QuestionType;

  multipleChoiceOptions?: MultipleChoiceOption[];
  chemistryEquations?: string[];
  fillableTable?: {
    value: string;
    hidden: boolean;
    heading: boolean;
    element?: {
      a: number;
      z: number;
      x: string;
      c: string;
    };
  }[][];

  answer: {
    explanation?: string;
    multipliers?: { [key: string]: string };
    number?: string;
  };

  source?: string;
  subject?: string;
  bookmarked: boolean;
}

export interface QnAQuestionResponse {
  _id: string;

  question: string;
  type: 'MULTI' | QuestionType;

  multipleChoiceOptions?: {
    text: string;
    correct?: boolean;
  }[];
  chemistryEquations?: string[];
  fillableTable?: {
    value: string;
    hidden: boolean;
    heading: boolean;
    element?: {
      a: number;
      z: number;
      x: string;
      c: string;
    };
  }[][];

  answer?: {
    explanation?: string;
    multipliers?: { [key: string]: string };
    number?: string;
  };

  subquestions?: SingleQuestion[];

  source?: string;
  subject?: string;
  bookmarked: boolean;
}

export interface QnAStatusResponse {
  subject: string;
  total: number;
  used: number;
  bookmarked: number;
}

const sessionListeners: (() => void)[] = [];
let session: any = window.localStorage.getItem('session');
export const setSession = (s?: string) => {
  session = s;
  if (s) window.localStorage.setItem('session', s);
  else window.localStorage.removeItem('session');
  sessionListeners.forEach((l) => l());
};

export const getSession = () => session;

export function useSessionExists() {
  const [sessionExists, setSessionExists] = useState(!!session);
  useEffect(() => {
    const listener = () => setSessionExists(!!session);
    sessionListeners.push(listener);
    return () => {
      sessionListeners.splice(sessionListeners.indexOf(listener), 1);
    };
  });
  return sessionExists;
}

export class QnA {
  static getQuestionsForCategory(
    subject: string,
    limit?: number,
    filter?: string
  ): Promise<QnAQuestionResponse[]> {
    return fetch(
      `${API_ENDPOINT}/qna/questions?subject=${subject}&limit=${limit || 5}${
        filter ? `&filter=${filter}` : ''
      }`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    ).then((r) => r.json());
  }

  static getStatus(): Promise<QnAStatusResponse[]> {
    return fetch(`${API_ENDPOINT}/qna/status`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }).then((r) => r.json());
  }

  /*static getQuestion(id: string): Promise<QnAQuestionResponse> {
    return fetch(`${API_ENDPOINT}/qna/questions/${id}`).then(r => r.json());
  }*/
}
