/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

export function NavigationLink(props: any) {
  return (
    <div
      css={{
        marginLeft: '2em',
        fontWeight: 'bold',
      }}
    >
      <Link
        css={(theme) => ({
          color: theme.colors.contrast,
          textDecoration: 'none',
          paddingBottom: '0.25em',
          whiteSpace: 'nowrap',
          ':hover': {
            borderBottom: '1px solid',
            borderBottomColor: theme.colors.contrast,
          },
        })}
        {...props}
      >
        {props.children}
      </Link>
    </div>
  );
}
