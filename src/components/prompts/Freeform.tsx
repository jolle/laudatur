/** @jsx jsx */
import { jsx } from '@emotion/core';
// @ts-ignore
import MathJax from 'react-mathjax-preview';
import { AnswerBox } from '../../styles/AnswerBox';
import { QnAQuestionResponse } from '../../api/QnA';

export function Freeform({
  question,
  checkable = false,
}: {
  question: QnAQuestionResponse;
  checkable: boolean;
}) {
  return (
    <div>
      <textarea
        css={{
          width: '100%',
          height: '10em',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
          border: '1px solid #f1f5f8',
          borderRadius: '0.25em',
          outline: 'none',
          padding: '1em',
          resize: 'none',
        }}
      />
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
