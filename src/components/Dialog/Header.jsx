// @flow strict

import React, { type Node } from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('DialogContent', {
  content: {
    padding: 24,
    paddingBottom: 20,
    width: '100%',
    boxSizing: 'border-box',
  },
});

function Header(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <Typography
          typography="title"
          element="header"
          className={`${classes.header} ${props.className}`}
          {...getNotDeclaredProps(props, Header)}
        >
          {props.children}
        </Typography>
      )}
    </Sheet>
  );
}

Header.propTypes = {};

Header.defaultProps = { className: '' };

export default Header;
