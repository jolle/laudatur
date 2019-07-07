/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core';
import { SmallContainer } from '../styles/SmallContainer';
import { Button } from '../styles/Button';
import { FormTable } from '../styles/FormTable';
import { Input } from '../styles/Input';
import Loader from '../components/icons/Loader';
import { Users } from '../api/Users';
import { RouteComponentProps } from 'react-router';

const REGISTER_ERRORS = {
  MISSING_FIELDS: 'Et täyttänyt kaikkia kenttiä.',
  USERNAME_TOO_SHORT: 'Käyttäjätunnuksen tulee olla vähintään 3 merkkiä pitkä.',
  PASSWORD_TOO_SHORT: 'Salasanan tulee olla vähintään 6 merkkiä pitkä.',
  USERNAME_TAKEN: 'Käyttäjätunnus on jo käytössä.'
} as { [key: string]: string };

export default function Register({ history }: RouteComponentProps) {
  const form = React.createRef<HTMLFormElement>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
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
      <SmallContainer>
        <form onSubmit={e => e.preventDefault()} ref={form}>
          <FormTable>
            <tbody>
              {error && (
                <tr>
                  <td />
                  <td>
                    <div
                      css={{
                        backgroundColor: '#e53e3e',
                        borderRadius: '4px',
                        padding: '10px',
                        color: '#fff',
                        boxShadow:
                          '0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <strong>Virhe!</strong> {error}
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td>Käyttäjänimi</td>
                <td>
                  <Input type="text" name="username" />
                </td>
              </tr>
              <tr>
                <td>Salasana</td>
                <td>
                  <Input type="password" name="password" />
                </td>
              </tr>
              <tr>
                <td>Salasana uudelleen</td>
                <td>
                  <Input type="password" name="password-repeat" />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Button
                    css={{ display: 'inline-block', marginBottom: '1em' }}
                    disabled={loading}
                    onClick={() => {
                      if (!form.current) return;
                      setLoading(true);

                      const user: any = Array.from(
                        new FormData(form.current)
                      ).reduce((p, n) => ({ ...p, [n[0]]: n[1] }), {});

                      if (user.username.length < 3) {
                        setLoading(false);
                        setError(REGISTER_ERRORS.USERNAME_TOO_SHORT);
                        return;
                      }

                      if (user.password.length < 6) {
                        setLoading(false);
                        setError(REGISTER_ERRORS.PASSWORD_TOO_SHORT);
                        return;
                      }

                      if (user.password !== user['password-repeat']) {
                        setLoading(false);
                        setError(
                          'Antamasi salasana ei vastaa uudelleen annetun salasanan kanssa.'
                        );
                        return;
                      }

                      delete user['password-repeat'];

                      Users.createUser(user).then(({ success, error }) => {
                        if (success) {
                          history.push('/login');
                        } else {
                          setLoading(false);
                          setError(
                            error
                              ? REGISTER_ERRORS[error] || error
                              : 'Tapahtui tuntematon virhe. Yritä uudelleen.'
                          );
                        }
                      });
                    }}
                  >
                    Rekisteröidy
                  </Button>
                  {loading && (
                    <div
                      css={{
                        verticalAlign: 'middle',
                        color: '#a0aec0',
                        display: 'inline-block',
                        marginLeft: '1em'
                      }}
                    >
                      <Loader width="30px" height="30px" />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </FormTable>
        </form>
      </SmallContainer>
    </div>
  );
}
