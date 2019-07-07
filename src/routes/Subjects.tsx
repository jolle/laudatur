/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { SmallContainer } from '../styles/SmallContainer';
import { QnA, QnAStatusResponse } from '../api/QnA';
import { Input } from '../styles/Input';
import { Button } from '../styles/Button';
import { RouteComponentProps } from 'react-router';
import { SUBJECT_ABBREVIATIONS } from '../constants';

export default function Subjects({ history }: RouteComponentProps) {
  const [subjects, setSubjects] = useState([] as QnAStatusResponse[]);

  useEffect(() => {
    QnA.getStatus().then((d) => setSubjects(d));
  }, []);

  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5em',
        marginBottom: '4em',
        '@media screen and (max-width: 560px)': {
          marginTop: '6em',
        },
      }}
    >
      <SmallContainer>
        <h1>Aineet</h1>
        {subjects.map((s) => (
          <div
            css={{
              display: 'flex',
              backgroundColor: '#fff',
              flexDirection: 'column',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #edf2f7',
              marginBottom: '1em',
              '&:hover': {
                'form:last-child': {
                  maxHeight: '250px',
                },
              },
            }}
          >
            <div
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '20px',
              }}
            >
              <div>
                <b>
                  {SUBJECT_ABBREVIATIONS[s.subject]} ({s.subject})
                </b>
              </div>
              <div>{Math.round((s.used / s.total) * 100)}%</div>
            </div>

            <form
              css={{
                maxHeight: 0,
                overflow: 'hidden',
                transition: 'max-height 0.25s ease-in-out',
                display: 'flex',
              }}
              onSubmit={(e) => (
                history.push(
                  `/questions/${s.subject}?${Array.from(
                    new FormData(e.currentTarget)
                  ).reduce(
                    (p, n) =>
                      `${p}${p.length > 0 ? '&' : ''}${
                        n[0]
                      }=${encodeURIComponent(n[1] as any)}`,
                    ''
                  )}`
                ),
                e.preventDefault()
              )}
            >
              <div
                css={{
                  width: '60%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'column',
                  marginTop: '1em',
                  '@media screen and (max-width: 560px)': {
                    fontSize: '10pt',
                  },
                }}
              >
                <label css={{ cursor: 'pointer', display: 'flex' }}>
                  <input type="radio" name="filter" value="" />
                  <div>Kaikki kysymykset ({s.total})</div>
                </label>
                <label css={{ cursor: 'pointer', display: 'flex' }}>
                  <input
                    type="radio"
                    name="filter"
                    value="notUsed"
                    defaultChecked
                  />
                  <div>Käyttämättömät kysymykset ({s.total - s.used})</div>
                </label>
                <label css={{ cursor: 'pointer', display: 'flex' }}>
                  <input type="radio" name="filter" value="used" />
                  <div>Käytetyt kysymykset ({s.used})</div>
                </label>
                <label css={{ cursor: 'pointer', display: 'flex' }}>
                  <input type="radio" name="filter" value="bookmarked" />
                  <div>Kirjanmerkit ({s.bookmarked})</div>
                </label>
              </div>
              <div
                css={{ width: '40%', position: 'relative', marginTop: '1em' }}
              >
                <div
                  css={{
                    display: 'flex',
                  }}
                >
                  <div
                    css={{
                      paddingRight: '1em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      flexGrow: 1,
                      '@media (max-width: 500px)': {
                        fontSize: '9pt',
                        paddingRight: '0.5em',
                      },
                    }}
                  >
                    Kysymyksiä:
                  </div>
                  <div
                    css={{
                      width: '33%',
                      paddingRight: '5px',
                      flexShrink: 0,
                    }}
                  >
                    <Input
                      css={{
                        margin: 0,
                      }}
                      type="number"
                      name="limit"
                      max="15"
                      min="1"
                      defaultValue="5"
                      onChange={(e) =>
                        e.currentTarget.value &&
                        (+e.currentTarget.value > 15 ||
                          +e.currentTarget.value < 1 ||
                          !/^[0-9]*$/.test(e.currentTarget.value)) &&
                        (e.currentTarget.value = '1')
                      }
                    />
                  </div>
                </div>
                <Button
                  css={{
                    zIndex: 100,
                    fontSize: '12pt',
                    float: 'right',
                    marginTop: '1em',
                    marginLeft: '5px',
                    marginBottom: '5px',
                  }}
                >
                  Aloita
                </Button>
              </div>
            </form>
          </div>
        ))}
      </SmallContainer>
    </div>
  );
}
