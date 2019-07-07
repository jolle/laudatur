/** @jsx jsx */
import { jsx } from '@emotion/core';
import { QnAQuestionResponse, SingleQuestion } from '../api/QnA';
// @ts-ignore
import MathJax from 'react-mathjax-preview';
import QuestionTypeToPrompt from '../helpers/QuestionTypeToPrompt';
import { LETTERS } from '../constants';

export function Question({
  question,
  shouldCheck,
}: {
  question: QnAQuestionResponse;
  shouldCheck: boolean;
}) {
  const questions =
    question.type === 'MULTI' && question.subquestions
      ? question.subquestions
      : [question as SingleQuestion];

  const prompts = questions
    .map((q) => ({ q, Prompt: QuestionTypeToPrompt(q.type) }))
    .map(({ q, Prompt }) => (
      <div>
        <div
          css={{
            marginTop: '0.5em',
            marginBottom: '0.5em',
          }}
        >
          <MathJax
            math={q.question.replace(/\\n/g, '\n').replace(/\n/g, '<br/>')}
          />
        </div>
        <Prompt checkable={shouldCheck} question={q} />
      </div>
    ));

  return (
    <div>
      {question.type === 'MULTI' && question.question.trim().length > 0 && (
        <MathJax
          math={question.question.replace(/\\n/g, '\n').replace(/\n/g, '<br/>')}
        />
      )}
      {prompts.map((prompt, i) => (
        <div
          css={{
            marginBottom: '1em',
          }}
          key={i}
        >
          {prompts.length > 1 && <strong>{LETTERS[i].toLowerCase()})</strong>}{' '}
          {prompt}
        </div>
      ))}
      {question.source ? (
        <div
          css={{
            color: '#8795A1',
            fontSize: '0.75em',
            marginTop: '1em',
          }}
        >
          Lähde: {question.source}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
