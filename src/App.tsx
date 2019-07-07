(window as any).MathJax = {
  messageStyle: 'none',
  inTabOrder: false,
  showMathMenu: false,
  showMathMenuMSIE: false
};
/** @jsx jsx */
import React, { useState } from 'react';
import './App.css';
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  BrowserRouter
} from 'react-router-dom';
import { jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import Index from './routes/Index';
import Logo from './components/Logo';
import { Container } from './styles/Container';
import QuestionSet from './routes/QuestionSet';
import RouteChange from './components/RouteChange';
import Register from './routes/Register';
import Login from './routes/Login';
import Subjects from './routes/Subjects';
import { NavigationLink } from './components/NavigationLink';
import { useSessionExists } from './api/QnA';
import Logout from './routes/Logout';

function App() {
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const hasSession = useSessionExists();

  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: '#3490DC',
          secondary: '#3D4852',
          contrast: '#F8FAFC',

          correctGreen: '#38C172',
          incorrectRed: '#E3342F'
        }
      }}
    >
      <BrowserRouter>
        <RouteChange
          actions={[
            ({ pathname }: { pathname: string }) => setCurrentRoute(pathname)
          ]}
        >
          <div>
            <nav
              css={theme => ({
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                zIndex: 100,
                color: theme.colors.contrast,
                height: '4em',
                backgroundColor:
                  currentRoute === '/' ? 'rgba(0, 0, 0, 0.15)' : '#000',
                '@media screen and (max-width: 560px)': {
                  height: 'auto'
                }
              })}
            >
              <div
                css={{
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  '@media screen and (max-width: 560px)': {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }
                }}
              >
                <div
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '1em',
                    '@media screen and (max-width: 560px)': {
                      marginTop: '1em'
                    }
                  }}
                >
                  <Link
                    to="/"
                    css={{
                      color: 'inherit'
                    }}
                  >
                    <Logo height="2em" />
                  </Link>
                </div>

                <div
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    marginRight: '1em',
                    '@media screen and (max-width: 560px)': {
                      justifyContent: 'center',
                      marginRight: 0,
                      marginLeft: '1em',
                      marginTop: '1em',
                      marginBottom: '1em',
                      alignItems: 'flex-start',
                      '& > div > div': {
                        // nav links themselves
                        marginRight: '1em',
                        marginLeft: 0,
                        fontSize: '13pt'
                      }
                    }
                  }}
                >
                  <div css={{ display: 'flex', alignItems: 'center' }}>
                    <NavigationLink to="/">Etusivu</NavigationLink>
                    {hasSession && (
                      <NavigationLink to="/subjects">Aineet</NavigationLink>
                    )}
                  </div>

                  <div
                    css={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {!hasSession && (
                      <NavigationLink to="/register">
                        Rekisteröidy
                      </NavigationLink>
                    )}
                    {!hasSession && (
                      <NavigationLink to="/login">
                        Kirjaudu sisään
                      </NavigationLink>
                    )}
                    {hasSession && (
                      <NavigationLink to="/logout">
                        Kirjaudu ulos
                      </NavigationLink>
                    )}
                  </div>
                </div>
              </div>
            </nav>
            <div>
              <Route path="/" exact component={Index} />
              {!hasSession && (
                <Route path="/register" exact component={Register} />
              )}
              {!hasSession && <Route path="/login" exact component={Login} />}

              {hasSession && (
                <Route path="/subjects" exact component={Subjects} />
              )}
              {hasSession && (
                <Route
                  path="/questions/:subject"
                  exact
                  component={QuestionSet}
                />
              )}
              {hasSession && <Route path="/logout" exact component={Logout} />}
            </div>
          </div>
        </RouteChange>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const HotApp = hot(App);

export default HotApp;
