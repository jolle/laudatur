/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from '../styles/Button';
import { RouteComponentProps } from 'react-router';
import { useSessionExists } from '../api/QnA';

export default function Index({ history }: RouteComponentProps) {
  const hasSession = useSessionExists();

  return (
    <div
      css={(theme) => ({
        background: 'linear-gradient(to top, #29323c, #3e4a56)',
        width: '100vw',
        height: '100vh',
        color: theme.colors.contrast,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      })}
    >
      <h1
        css={{
          fontSize: '5em',
          margin: '0',
          marginLeft: '3em',
          marginRight: '3em',
          '@media screen and (max-width: 520px)': { fontSize: '3em' },
        }}
      >
        Tervetuloa Laudaturiin!
      </h1>
      <p css={{ fontSize: '1.5em', marginLeft: '3em', marginRight: '3em' }}>
        Aloita harjoittelemaan ylioppilastutkiintoosi nyt!
      </p>
      <Button
        onClick={() =>
          hasSession ? history.push('/subjects') : history.push('/register')
        }
      >
        Aloita opiskelu &raquo;
      </Button>
    </div>
  );
}
