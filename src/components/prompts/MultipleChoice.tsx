/** @jsx jsx */
import { jsx } from '@emotion/core';
import { QnAQuestionResponse } from '../../api/QnA';
import React from 'react';
// @ts-ignore
import MathJax from 'react-mathjax-preview';
import { AnswerBox } from '../../styles/AnswerBox';
import { LETTERS } from '../../constants';

export function MultipleChoice({
  question,
  checkable = false,
}: {
  question: QnAQuestionResponse;
  checkable: boolean;
}) {
  if (!question.multipleChoiceOptions)
    return (
      <div>Failed to render MultipleChoice prompt: choices do not exist.</div>
    );

  return (
    <div>
      {question.multipleChoiceOptions.map((option, i) => (
        <label
          css={{
            padding: '0.25em',
            display: 'flex',
            ...(checkable ? {} : { cursor: 'pointer' }),
            alignItems: 'center',
          }}
          key={`${question._id}-${i}`}
        >
          <input
            type="checkbox"
            css={{
              display: 'none',
            }}
            disabled={checkable}
          />
          <div
            css={(theme) => ({
              borderRadius: '9999px',
              border: '3px solid',
              borderColor: checkable
                ? option.correct
                  ? theme.colors.correctGreen
                  : theme.colors.incorrectRed
                : theme.colors.primary,
              color: checkable
                ? option.correct
                  ? theme.colors.correctGreen
                  : theme.colors.incorrectRed
                : theme.colors.primary,
              width: '2em',
              height: '2em',
              textAlign: 'center',
              lineHeight: '2em',
              fontWeight: 'bold',
              fontSize: '1.125em',
              marginRight: '0.5em',
              flexShrink: 0,

              'input:checked + &': {
                backgroundColor: checkable
                  ? option.correct
                    ? theme.colors.correctGreen
                    : theme.colors.incorrectRed
                  : theme.colors.primary,
                color: '#fff',
                ...(checkable
                  ? {
                      borderColor: option.correct
                        ? theme.colors.correctGreen
                        : theme.colors.incorrectRed,
                    }
                  : {}),
              },
            })}
          >
            {LETTERS[i]}
          </div>
          <MathJax
            math={option.text.replace(/\\n/g, '\n').replace(/\n/g, '<br/>')}
          />
        </label>
      ))}
      {checkable && question.answer && question.answer.explanation ? (
        <AnswerBox>
          <MathJax
            math={question.answer.explanation
              .replace(/\\n/g, '\n')
              .replace(/\n/g, '<br/>')}
          />
        </AnswerBox>
      ) : (
        ''
      )}
    </div>
  );
}
