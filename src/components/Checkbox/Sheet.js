// @flow strict

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/schema';
import { getActiveColor } from '../../theme/utils';

type Styles = {
  checkbox: {},
  icon: {},
};
export type Data = {
  disabled: boolean,
  checked: boolean,
  color: 'primary' | 'accent',
};

export default createSheet('Checkbox', (theme: Theme): Styles => {
  return {
    checkbox: {
      display: 'inline-block',
      position: 'relative',
      borderRadius: '50%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: 48,
      width: 48,
      outline: 0,
      padding: 8,
      backgroundColor: 'inherit',
      cursor(data: Data): string {
        return data.disabled ? 'disabled' : 'pointer';
      },
      pointerEvents(data: Data): string {
        return data.disabled ? 'none' : 'auto';
      },
      color(data: Data): string {
        return data.checked ? getActiveColor(theme, data.color) : theme.text.secondary;
      },
    },

    icon: {
      position: 'absolute',
      top: 12,
      left: 12,
      right: 12,
      bottom: 12,

      color(data: Data): string {
        if (data.disabled) {
          return theme.disabled;
        }

        return data.checked ? getActiveColor(theme, data.color) : theme.text.secondary;
      },
    },
  };
});