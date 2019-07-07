/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { QnAQuestionResponse } from '../../api/QnA';
import { AnswerBox } from '../../styles/AnswerBox';

const check = (correct: any, given: any) =>
  given && typeof correct === 'number'
    ? correct === parseFloat(given)
    : correct === given;

export function FillableTable({
  question,
  checkable = false,
}: {
  question: QnAQuestionResponse;
  checkable: boolean;
}) {
  if (!question.fillableTable)
    return <div>Failed to render FillableTable: no table data</div>;

  const [copiedAnswers, setCopiedAnswers] = useState(
    JSON.parse(JSON.stringify(question.fillableTable))
  );

  const getGivenAnswer = (rowNumber: number, columnNumber: number) =>
    (copiedAnswers[rowNumber] && copiedAnswers[rowNumber][columnNumber]).answer;

  const changeAnswer = (
    rowNumber: number,
    columnNumber: number,
    value: any
  ) => {
    copiedAnswers[rowNumber][columnNumber].answer = value;
    setCopiedAnswers(copiedAnswers);
  };

  return (
    <div>
      <table
        css={{
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
        }}
      >
        <tbody>
          {question.fillableTable.map((row, rowNumber) => (
            <tr key={rowNumber}>
              {row.map((cell, columnNumber) => (
                <td
                  key={`${rowNumber}-${columnNumber}`}
                  css={{
                    ...(cell.heading
                      ? {
                          backgroundColor: '#f8f8f8',
                        }
                      : {
                          textAlign: 'center',
                        }),
                    padding: cell.hidden && !cell.element ? '0' : '0.5rem',
                    position: 'relative',
                    border: '1px solid #ababab',
                    ...(!cell.hidden && !cell.heading
                      ? {
                          backgroundColor: '#d3d3d3',
                        }
                      : {}),
                  }}
                >
                  {cell.hidden && !checkable ? (
                    cell.element ? (
                      <div>
                        <div
                          css={{
                            flex: 1,
                            display: 'inline-flex',
                            flexDirection: 'column',
                            verticalAlign: 'middle',
                          }}
                        >
                          <input
                            type="text"
                            placeholder="?"
                            css={{
                              width: '20px',
                              fontSize: '7pt',
                              border: '1px solid #000',
                              textAlign: 'center',
                              outline: 'none',
                              marginTop: '-1px',
                              marginLeft: '-1px',
                              fontFamily: 'inherit',
                            }}
                            onChange={(e) =>
                              changeAnswer(rowNumber, columnNumber, {
                                ...copiedAnswers[rowNumber][columnNumber]
                                  .answer,
                                a: e.currentTarget.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            placeholder="?"
                            css={{
                              width: '20px',
                              fontSize: '7pt',
                              border: '1px solid #000',
                              textAlign: 'center',
                              outline: 'none',
                              marginTop: '-1px',
                              marginLeft: '-1px',
                              fontFamily: 'inherit',
                            }}
                            onChange={(e) =>
                              changeAnswer(rowNumber, columnNumber, {
                                ...copiedAnswers[rowNumber][columnNumber]
                                  .answer,
                                z: e.currentTarget.value,
                              })
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="?"
                          css={{
                            display: 'inline',
                            width: '30px',
                            border: '1px solid #000',
                            textAlign: 'center',
                            outline: 'none',
                            marginTop: '-1px',
                            marginLeft: '-1px',
                            fontFamily: 'inherit',
                          }}
                          onChange={(e) =>
                            changeAnswer(rowNumber, columnNumber, {
                              ...copiedAnswers[rowNumber][columnNumber].answer,
                              x: e.currentTarget.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="?"
                          css={{
                            display: 'inline',
                            width: '20px',
                            fontSize: '7pt',
                            verticalAlign: 'top',
                            border: '1px solid #000',
                            textAlign: 'center',
                            outline: 'none',
                            marginTop: '-1px',
                            marginLeft: '-1px',
                            fontFamily: 'inherit',
                          }}
                          onChange={(e) =>
                            changeAnswer(rowNumber, columnNumber, {
                              ...copiedAnswers[rowNumber][columnNumber].answer,
                              c: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        css={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none',
                          border: 'none',
                          outline: 'none',
                          position: 'absolute',
                          top: '0',
                          bottom: '0',
                          right: '0',
                          left: '0',
                          width: 'calc(100% - 1rem)',
                          fontSize: '12pt',
                          padding: '0.5rem',
                          textAlign: 'center',
                        }}
                        onChange={(e) =>
                          changeAnswer(
                            rowNumber,
                            columnNumber,
                            e.currentTarget.value
                          )
                        }
                      />
                    )
                  ) : cell.hidden &&
                    !getGivenAnswer(rowNumber, columnNumber) ? (
                    <div />
                  ) : cell.element ? (
                    <div>
                      <div
                        css={{
                          flex: 1,
                          display: 'inline-flex',
                          flexDirection: 'column',
                          fontSize: '7pt',
                          verticalAlign: 'middle',
                        }}
                      >
                        <div
                          css={(theme) => ({
                            color: cell.hidden
                              ? checkable &&
                                getGivenAnswer(rowNumber, columnNumber) &&
                                check(
                                  (cell.element || { a: 0 }).a,
                                  getGivenAnswer(rowNumber, columnNumber).a
                                )
                                ? theme.colors.correctGreen
                                : theme.colors.incorrectRed
                              : '',
                          })}
                        >
                          {
                            (cell.hidden
                              ? getGivenAnswer(rowNumber, columnNumber)
                              : cell.element
                            ).a
                          }
                        </div>
                        <div
                          css={(theme) => ({
                            color: cell.hidden
                              ? checkable &&
                                getGivenAnswer(rowNumber, columnNumber) &&
                                check(
                                  (cell.element || { z: 0 }).z,
                                  getGivenAnswer(rowNumber, columnNumber).z
                                )
                                ? theme.colors.correctGreen
                                : theme.colors.incorrectRed
                              : '',
                          })}
                        >
                          {
                            (cell.hidden
                              ? getGivenAnswer(rowNumber, columnNumber)
                              : cell.element
                            ).z
                          }
                        </div>
                      </div>
                      <div
                        css={(theme) => ({
                          color: cell.hidden
                            ? checkable &&
                              getGivenAnswer(rowNumber, columnNumber) &&
                              check(
                                (cell.element || { x: 'X' }).x,
                                getGivenAnswer(rowNumber, columnNumber).x
                              )
                              ? theme.colors.correctGreen
                              : theme.colors.incorrectRed
                            : '',
                          display: 'inline',
                        })}
                      >
                        {
                          (cell.hidden
                            ? getGivenAnswer(rowNumber, columnNumber)
                            : cell.element
                          ).x
                        }
                      </div>
                      <div
                        css={(theme) => ({
                          color: cell.hidden
                            ? checkable &&
                              getGivenAnswer(rowNumber, columnNumber) &&
                              check(
                                (cell.element || { c: '0' }).c,
                                getGivenAnswer(rowNumber, columnNumber).c
                              )
                              ? theme.colors.correctGreen
                              : theme.colors.incorrectRed
                            : '',
                          display:
                            (cell.hidden
                              ? getGivenAnswer(rowNumber, columnNumber)
                              : cell.element
                            ).c === '0'
                              ? 'none'
                              : 'inline',
                          fontSize: '7pt',
                          verticalAlign: 'top',
                        })}
                      >
                        {
                          (cell.hidden
                            ? getGivenAnswer(rowNumber, columnNumber)
                            : cell.element
                          ).c
                        }
                      </div>
                    </div>
                  ) : cell.hidden ? (
                    <div
                      css={(theme) =>
                        checkable
                          ? {
                              color:
                                parseFloat(
                                  getGivenAnswer(rowNumber, columnNumber)
                                ) === parseFloat(cell.value)
                                  ? theme.colors.correctGreen
                                  : theme.colors.incorrectRed,
                            }
                          : {}
                      }
                    >
                      {getGivenAnswer(rowNumber, columnNumber)}
                    </div>
                  ) : (
                    cell.value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {checkable && (
        <AnswerBox>
          <table
            css={{
              borderCollapse: 'collapse',
              backgroundColor: '#fff',
            }}
          >
            <tbody>
              {question.fillableTable.map((row, rowNumber) => (
                <tr key={rowNumber}>
                  {row.map((cell, columnNumber) => (
                    <td
                      key={`${rowNumber}-${columnNumber}`}
                      css={{
                        ...(cell.heading
                          ? {
                              backgroundColor: '#f8f8f8',
                            }
                          : {
                              textAlign: 'center',
                            }),
                        padding: '0.5rem',
                        border: '1px solid #ababab',
                        ...(!cell.hidden && !cell.heading
                          ? {
                              backgroundColor: '#d3d3d3',
                            }
                          : {}),
                      }}
                    >
                      {cell.element ? (
                        <div>
                          <div
                            css={{
                              flex: 1,
                              display: 'inline-flex',
                              flexDirection: 'column',
                              fontSize: '7pt',
                              verticalAlign: 'middle',
                            }}
                          >
                            <div>{cell.element.a}</div>
                            <div>{cell.element.z}</div>
                          </div>
                          <div
                            css={{
                              display: 'inline',
                            }}
                          >
                            {cell.element.x}
                          </div>
                          <div
                            css={{
                              display:
                                cell.element.c === '0' ? 'none' : 'inline',
                              fontSize: '7pt',
                              verticalAlign: 'top',
                            }}
                          >
                            {cell.element.c}
                          </div>
                        </div>
                      ) : (
                        cell.value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </AnswerBox>
      )}
    </div>
  );
}
