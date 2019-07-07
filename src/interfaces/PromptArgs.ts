import { QnAQuestionResponse } from '../api/QnA';
import { UserAnswer } from './UserAnswer';

export type PromptArgs = {
  question: QnAQuestionResponse;
  checkable: boolean;
  onAnswer: (answer: UserAnswer) => void;
};
