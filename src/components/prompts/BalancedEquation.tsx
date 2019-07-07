/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
// @ts-ignore
import MathJax from 'react-mathjax-preview';
import { AnswerBox } from '../../styles/AnswerBox';

export default class BalancedEquation extends React.Component<{
  equations: string[];
}> {
  state: {
    answer?: { [key: string]: string };
    userAnswers: { [key: string]: string };
  } = {
    userAnswers: {}
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.equations.map((equation, i) => (
          <div
            key={i}
            css={{
              display: 'flex',
              marginTop: '1em'
            }}
          >
            {equation.split(/\{\{([^}]+)\}\}/g).map(piece =>
              /^multiplier:[0-9]+$/.test(piece) ? (
                <input
                  disabled={!!this.state.answer}
                  css={theme => ({
                    display: 'inline-block',
                    width: '1.5em',
                    border: 'none',
                    borderBottom: '1px solid #000',
                    paddingBottom: '0.25em',
                    outline: 'none',
                    marginRight: '0.5em',
                    fontSize: '1em',
                    textAlign: 'right',
                    ...(this.state.answer
                      ? {
                          backgroundColor:
                            this.state.userAnswers[
                              (piece.match(/^multiplier:([0-9]+)$/) || [])[1]
                            ] ==
                            this.state.answer[
                              (piece.match(/^multiplier:([0-9]+)$/) || [])[1]
                            ]
                              ? theme.colors.correctGreen
                              : theme.colors.incorrectRed,
                          color: '#fff',
                          borderBottom: 'none',
                          borderRadius: '0.25em',
                          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
                          textAlign: 'center'
                        }
                      : {})
                  })}
                  value={
                    this.state.userAnswers[
                      (piece.match(/^multiplier:([0-9]+)$/) || [])[1]
                    ]
                  }
                  onChange={e =>
                    this.setState({
                      userAnswers: {
                        ...this.state.userAnswers,
                        [(piece.match(/^multiplier:([0-9]+)$/) || [])[1]]:
                          e.currentTarget.value
                      }
                    })
                  }
                  onKeyPress={e =>
                    (e.currentTarget.value.length >= 2 ||
                      !/^[0-9]$/.test(e.key)) &&
                    e.preventDefault()
                  }
                />
              ) : (
                <MathJax math={piece} />
              )
            )}
          </div>
        ))}

        {this.state.answer ? (
          <AnswerBox>
            {this.props.equations.map(equation => (
              <MathJax
                math={equation.replace(
                  /\{\{multiplier:([0-9]+)\}\}/g,
                  (_, key) => `$${(this.state.answer || { [key]: '?' })[key]}$`
                )}
              />
            ))}
          </AnswerBox>
        ) : (
          ''
        )}
      </div>
    );
  }

  check(correctAnswer: any) {
    this.setState({
      answer: correctAnswer.multipliers
    });
  }
}
