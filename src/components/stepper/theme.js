import PropTypes from 'prop-types';

export const schema = PropTypes.shape({
  headers: PropTypes.shape({
    dots: PropTypes.shape({
      inactiveColor: PropTypes.string.isRequired,
      activeColor: PropTypes.string.isRequired,
      dotSize: PropTypes.number.isRequired,
      margin: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  section: PropTypes.shape({
    mobilePadding: PropTypes.number.isRequired,
    tabletPadding: PropTypes.number.isRequired,
  }).isRequired,
}).isRequired;

export function defaultTheme(vars) {
  return {
    headers: {
      dots: {
        inactiveColor: vars.disabledColor,
        activeColor: vars.primaryBase,
        dotSize: 8,
        margin: 4,
      },
    },

    section: {
      mobilePadding: 16,
      tabletPadding: 24,
    },
  };
}
