/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Redirect } from 'react-router';
import { setSession } from '../api/QnA';

export default function Logout() {
  setSession(); // to undefined

  return <Redirect to="/" />;
}
