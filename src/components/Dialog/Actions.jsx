// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('Dialog-Actions', {
  actions: {
    padding: 8,
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

function Actions(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.actions} ${props.className}`}
          {...getNotDeclaredProps(props, Actions)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

Actions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Actions.defaultProps = { className: '' };

export default Actions;
