/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core';
import { AnswerBox } from '../../styles/AnswerBox';
// @ts-ignore
import MathJax from 'react-mathjax-preview';
import { QnAQuestionResponse } from '../../api/QnA';

const checkNumberAnswer = (correct: string, given: string) =>
  parseFloat(correct.replace(/,/g, '.').replace(/[^0-9,./-]/, '')) ===
  parseFloat(given.replace(/,/g, '.').replace(/[^0-9,./-]/, ''));

export function NumberInput({
  question,
  checkable = false,
}: {
  question: QnAQuestionResponse;
  checkable: boolean;
}) {
  const [answer, setAnswer] = useState('');

  return (
    <div>
      <input
        css={(theme) => ({
          padding: '0.5em',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
          border: '1px solid #f1f5f8',
          borderRadius: '0.25em',
          outline: 'none',
          ...(checkable
            ? {
                backgroundColor: '#F1F5F8',
                color: checkNumberAnswer(
                  (question.answer || {}).number || '0',
                  answer
                )
                  ? theme.colors.correctGreen
                  : theme.colors.incorrectRed,
              }
            : {}),
        })}
        pattern="^[0-9,./]+$"
        disabled={checkable}
        value={answer}
        onKeyPress={(e) => !/^[0-9,./-]+$/.test(e.key) && e.preventDefault()}
        onChange={(e) => setAnswer(e.currentTarget.value)}
      />
      {checkable && question.answer && question.answer.explanation && (
        <AnswerBox>
          <MathJax
            math={question.answer.explanation
              .replace(/\\n/g, '\n')
              .replace(/\n/g, '<br/>')}
          />
        </AnswerBox>
      )}
    </div>
  );
}
