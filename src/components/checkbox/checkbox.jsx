import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import noop from 'lodash.noop';

import Ripple from '../ripple';
import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * The actual visual component of the checkbox.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export class Checkbox extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      checkbox: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      checkmark: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired,
    }).isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    className: '',
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
  };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    const isDark = theme.type === 'dark';
    const disabledColor = isDark ? '#717171' : '#b0b0b0';

    return {
      '@keyframes checkbox--animate-in': {
        from: {
          opacity: 1,
          transform: 'scale(0) rotate(-45deg)',
        },
        to: {
          opacity: 1,
          transform: 'scale(1) rotate(45deg)',
        },
      },

      '@keyframes checkbox--animate-out': {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },

      checkbox: {
        composes: 'checkbox',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '50%',
        boxSizing: 'border-box',
        height: 48,
        width: 48,
        margin: 8,
        backgroundColor: 'inherit',

        '&:focus': { outline: 0 },

        '&[aria-disabled=true]': {
          pointerEvents: 'none',

          '&[aria-checked=true] $container': { backgroundColor: disabledColor },
        },

        '&[aria-disabled=true] $container': {
          borderColor: disabledColor,
          backgroundColor: disabledColor,
        },

        '&[aria-disabled=false][aria-checked=true] $container': {
          borderColor: theme.primaryBase,
          backgroundColor: theme.primaryBase,
        },

        '&[aria-checked=true] $ripple': { color: theme.primaryBase },
      },

      ripple: {
        composes: 'checkbox--ripple',
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
      },

      container: {
        composes: 'checkbox--checkbox-container',
        display: 'inline-block',
        position: 'relative',
        border: 'solid 2px',
        boxSizing: 'border-box',
        margin: 15,
        height: 18,
        width: 18,
        borderRadius: 2,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
        transition: 'background-color, border-color, 160ms',
      },

      checkmark: {
        composes: 'checkbox--checkmark',
        width: '36%',
        height: '70%',
        position: 'absolute',
        border: '2.4px solid',
        left: -0.5,
        borderTop: 0,
        borderLeft: 0,
        transformOrigin: '97% 86%',
        willChange: 'opacity, transform',
        opacity: 0,
        boxSizing: 'content-box',
        animationDuration: 160,
        animationFillMode: 'forwards',
      },
    };
  }

  static keyCodes = [32];

  state = { isFocused: false };

  /**
   * Set the border color of the checkmark to the background-color from the root element.
   * If the checked props is initially true we want to animate the checkmark in.
   */
  componentDidMount() {
    this.setBgColor();
  }

  /**
   * Animate the checkmark bg color when the component prop changes.
   */
  componentDidUpdate() {
    this.setBgColor();
  }

  /**
   * Set the bg color for the checkmark.
   */
  setBgColor() {
    const bgColor = window.getComputedStyle(this.root)['background-color'];

    this.checkmark.style.borderColor = bgColor;
  }

  /**
   * A function which will be called with the element from EventHandler.
   *
   * @param {Object} element - The root element from EventHandler.
   */
  createRef = (element) => {
    this.root = element;
  };

  /**
   * Change the isFocused state to true when the component get's focused.
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ isFocused: true });
  };

  /**
   * Change the isFocused state to false when the component looses focus.
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ isFocused: false });
  };

  handlePress = () => this.props.onChange();

  /**
   * Call the onChange prop when a key is pressed.
   */
  handleKeyPress = (ev) => {
    if (Checkbox.keyCodes.includes(ev.keyCode)) {
      this.props.onChange();
    }
  };

  render() {
    const {
      disabled,
      classes,
      checked,
      className,
      ...props
    } = this.props;

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Checkbox)}
        component="span"
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-checked={checked}
        className={classnames(classes.checkbox, className)}
        createRef={this.createRef}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onPress={this.handlePress}
      >
        <span
          className={classes.container}
          ref={(element) => { this.checkbox = element; }}
        >
          <span
            className={classes.checkmark}
            style={{ animationName: `checkbox--animate-${checked ? 'in' : 'out'}` }}
            ref={(element) => { this.checkmark = element; }}
          />
        </span>

        <Ripple
          round
          center
          className={classes.ripple}
          isFocused={this.state.isFocused}
        />
      </EventHandler>
    );
  }
}

export default injectSheet(Checkbox.styles)(Checkbox);
