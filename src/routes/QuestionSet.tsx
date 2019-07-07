/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import { QnA, QnAQuestionResponse } from '../api/QnA';
import { Feedback } from '../api/Feedback';
import { SmallContainer } from '../styles/SmallContainer';
import { Question } from '../components/Question';
import { Button } from '../styles/Button';
import Flag from '../components/icons/Flag';
import { Modal, ModalBackdrop } from '../styles/Modal';
import { Link } from 'react-router-dom';
import Bookmark from '../components/icons/Bookmark';
import { Users } from '../api/Users';

export default function QuestionSet({
  match
}: {
  match: { params: { subject: string } };
}) {
  const [questions, setQuestions] = useState<QnAQuestionResponse[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shouldCheck, setShouldCheck] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    QnA.getQuestionsForCategory(
      match.params.subject,
      (params.get('limit') as any) || undefined,
      params.get('filter') || undefined
    ).then(response => setQuestions(response));
  }, []);

  const addBookmark = (question: QnAQuestionResponse) => {
    const questionIndex = currentQuestionIndex; // accounts for switching the question mid-save
    Users.addBookmark(question._id).then(({ success, bookmarked }) => {
      if (!success || !questions)
        return alert('Kirjanmerkin tallentaminen epäonnistui.');
      setQuestions([
        ...questions.slice(0, questionIndex),
        {
          ...questions[questionIndex],
          bookmarked
        },
        ...questions.slice(questionIndex + 1)
      ]);
    });
  };

  return (
    <div>
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5em',
          marginBottom: '4em',
          '@media screen and (max-width: 560px)': {
            marginTop: '7em'
          }
        }}
      >
        {questions && questions[currentQuestionIndex] ? (
          <SmallContainer
            css={{
              img: {
                maxWidth: '100%'
              }
            }}
          >
            <div
              css={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div
                css={{
                  color: '#888888',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  fontSize: '10pt',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#000'
                  }
                }}
                onClick={() => setShowReportModal(true)}
              >
                <Flag
                  css={{ display: 'inline-block' }}
                  width={'10px'}
                  height={'10px'}
                />{' '}
                Raportoi virhe
              </div>
              <div
                css={{
                  color: '#888888',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  fontSize: '10pt',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#000'
                  }
                }}
                onClick={() => addBookmark(questions[currentQuestionIndex])}
              >
                <Bookmark
                  css={{ display: 'inline-block' }}
                  width={'10px'}
                  height={'10px'}
                />{' '}
                {questions[currentQuestionIndex].bookmarked
                  ? 'Poista kirjanmerkeistä'
                  : 'Lisää kirjanmerkkeihin'}
              </div>
            </div>
            <Question
              question={questions[currentQuestionIndex]}
              shouldCheck={shouldCheck}
            />
            {!shouldCheck && (
              <Button
                css={{
                  display: 'inline-block',
                  marginTop: '1em',
                  padding: '0.5em 0.75em 0.5em 0.75em',
                  fontSize: '1em'
                }}
                onClick={() => setShouldCheck(true)}
              >
                Tarkista vastaukset
              </Button>
            )}
          </SmallContainer>
        ) : questions && questions.length === 0 ? (
          <div>Kysymyksiä antamillasi hakuehdoilla ei löytynyt.</div>
        ) : questions ? (
          <div>
            Pääsit loppuun!{' '}
            <Link
              to="/subjects"
              css={{
                color: 'inherit',
                borderBottom: '1px solid #000',
                textDecoration: 'none'
              }}
            >
              Takaisin ainevalikoimaan
            </Link>
          </div>
        ) : (
          <div>Ladataan...</div>
        )}
      </div>
      <div
        css={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          borderTop: '1px solid #DAE1E7',
          paddingTop: '1em',
          paddingBottom: '1em',
          backgroundColor: '#fff'
        }}
      >
        <SmallContainer
          css={{
            margin: '0 auto',
            textAlign: 'right'
          }}
        >
          <a
            href="#"
            css={{
              color: '#000',
              fontWeight: 'bold',
              borderBottom: '2px solid #000',
              textTransform: 'uppercase',
              textDecoration: 'none',
              paddingBottom: '0.25em',
              marginRight: '1em'
            }}
            onClick={e => {
              e.preventDefault();
              setShouldCheck(false);
              if (currentQuestionIndex + 1 > 15) {
                setQuestions([]);
                setCurrentQuestionIndex(0);
                // TODO: fetch more!
              } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
            }}
          >
            Seuraava kysymys &raquo;
          </a>
        </SmallContainer>
      </div>
      {showReportModal && (
        <div>
          <ModalBackdrop />
          <Modal css={{ padding: '2rem' }}>
            <form onSubmit={e => e.preventDefault()}>
              <p>Valitse virheen luonne:</p>
              <select name="bug-kind">
                <option value="cosmetic">Asetteluvirhe</option>
                <option value="content">Sisältövirhe</option>
                <option value="other">Muu virhe</option>
              </select>
              <p>Kuvaa virhettä muutamalla virkkeellä:</p>
              <textarea
                name="bug-description"
                rows={20}
                css={{
                  width: 'calc(100% - 2rem)',
                  border: '1px solid #dddddd',
                  borderRadius: '5px',
                  outline: 'none',
                  padding: '10px',
                  resize: 'none',
                  fontFamily: 'inherit',
                  fontSize: '10pt'
                }}
              />
              <Button
                css={{ marginTop: '1rem', display: 'inline-block' }}
                onClick={async e => {
                  const form =
                    e.currentTarget.parentElement &&
                    (e.currentTarget.parentElement as HTMLFormElement);
                  if (!form || !questions) return;
                  const data = {
                    ...Array.from(new FormData(form)).reduce(
                      (p, n) => ({ ...p, [n[0]]: n[1] }),
                      {}
                    ),
                    questionId: questions[currentQuestionIndex]._id
                  };

                  await Feedback.sendBugReport(data);
                  setShowReportModal(false);
                }}
              >
                Lähetä raportti
              </Button>
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
}
