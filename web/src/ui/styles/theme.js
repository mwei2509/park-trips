import colors from './colors';

const theme = {
  spacing: {
    small: '8',
    standard: '24'
  },
  fontSizes: {
    xsmall: '0.8em',
    small: '1.0em',
    medium: '1.25em',
    large: '1.563em',
    xlarge: '1.953em',
    x2large: '2.441em',
    x3large: '3.052em',
    x4large: '3.815em',
    x5large: '4.768em'
  },
  backgroundColor: colors.Gray7,
  backgroundDarkColor: colors.KindurDarkGreen,
  sideBarBackgroundColor: colors.KindurDarkBlue,
  primaryColor: colors.Transparent.Black80,
  primaryDarkColor: colors.Transparent.White98,
  secondaryColor: colors.Transparent.Black58,
  secondaryDarkColor: colors.Transparent.White80,

  /* Buttons */
  primaryButton: {
    buttonColor: colors.KindurRed,
    borderColor: '#CE564F',
    textColor: colors.Transparent.White98,
    buttonHoverColor: '#FE3F30',
    borderHoverColor: '#FE3529',
    textHoverColor: colors.White,
    buttonActiveColor: '#EB635B',
    borderActiveColor: '#C9544D',
    textActiveColor: colors.Transparent.White86
  },

  secondaryButton: {
    buttonColor: colors.KindurYellow,
    borderColor: '#DAAC5C',
    textColor: colors.Transparent.Black80,
    buttonHoverColor: '#FED564',
    borderHoverColor: '#E9C056',
    textHoverColor: colors.Transparent.Black80,
    buttonActiveColor: colors.KindurYellow,
    borderActiveColor: '#D5A85A',
    textActiveColor: colors.Transparent.Black58
  },

  flatLightButton: {
    textColor: colors.KindurRed,
    textHoverColor: '#FE170D',
    textActiveColor: '#EB635B'
  },

  flatDarkButton: {
    textColor: colors.KindurYellow,
    textHoverColor: '#FEEE54',
    textActiveColor: colors.KindurYellow
  },

  /* Horizontal rules */
  lightHRColor: colors.Transparent.Black20,

  /* Input Labels */
  labelColor: colors.Transparent.Black80,
  labelColorHover: colors.Black,

  /* Inputs */
  inputBackgroundColor: colors.Transparent.White80,
  inputBorderColor: colors.Transparent.Black14,
  inputBorderColorHover: colors.Transparent.Black33,
  inputColor: colors.Transparent.Black80,
  inputColorFocus: colors.Black,
  inputHelperTextColor: colors.Transparent.Black58,
  inputErrorColor: colors.KindurOrange,

  inputSizes: {
    xsmall: 3,
    small: 6,
    medium: 8,
    large: 15
  },

  /* Paper */
  paperColor: colors.White,
  paperShadowColor: colors.Transparent.Black14,

  /* Links */
  lightLinkColor: colors.KindurLightBlue,
  darkLinkColor: colors.KindurYellow,
  lightLinkHoverColor: colors.KindurDarkBlue,
  darkLinkHoverColor: colors.KindurYellow,

  /* Standards */
  primaryFont: 'Apercu Regular',
  baseFontSize: '16px',
  colors,
  borderRadius: '4px'
};

export default theme;
