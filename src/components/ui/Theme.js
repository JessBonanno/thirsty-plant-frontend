import { createMuiTheme } from '@material-ui/core/styles';

/**
 * initializes colors and font settings for app theme
 *
 *
 * @returns {default theme css}
 * @constructor
 */

// * fonts
const mulishFont = 'Mulish sans-serif';
const ralewayFont = 'Raleway, sans-serif';
const robotoFont = 'Roboto, sans-serif';

// * colors
const lightGreen = '#869965';
const green = '#66724C';
const yellow = '#FDBD17';
const pink = '#E86895';
const lightPink = '#FAD6F6';
const blue = 'lightblue';
const black = '#474747';

export default createMuiTheme({
  palette: {
    common: {
      green: green,
      lightGreen: lightGreen,
      yellow: yellow,
      pink: pink,
      lightPink: lightPink,
      blue: blue,
    },
    action: {
      //       active:
      // rgba(0, 0, 0, 0.54)
      // hover:
      // rgba(0, 0, 0, 0.04)
      // hoverOpacity: 0.04
      // selected:
      // rgba(0, 0, 0, 0.08)
      // selectedOpacity: 0.08
      // disabled:
      // rgba(0, 0, 0, 0.26)
      // disabledBackground:
      // rgba(0, 0, 0, 0.12)
      // disabledOpacity: 0.38
      // focus:
      // rgba(0, 0, 0, 0.12)
      // focusOpacity: 0.12
      // activatedOpacity: 0.12
    },
    primary: {
      main: lightGreen,
    },
    secondary: {
      main: yellow,
    },
  },
  typography: {
    h1: {},
    h2: {
      fontFamily: 'Mulish',
      color: green,
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: ralewayFont,
      color: green,
      fontSize: '3.5rem',
    },
    h4: {
      fontFamily: 'Mulish',
      color: pink,
      fontSize: '1.3rem',
    },
    h5: {
      fontFamily: ralewayFont,
      color: green,
      fontSize: '1.3rem',
    },
    h6: {
      fontFamily: ralewayFont,
      color: green,
      fontWeight: 500,
    },
    plantCardHeader: {
      fontFamily: 'Mulish',
      color: pink,
      fontSize: '1rem',
    },
    p: {
      fontFamily: ralewayFont,
      // color: 'white',
      fontSize: '1.4rem',
    },
    subtitle1: {
      fontFamily: ralewayFont,
      color: green,
      fontSize: '1.5rem',
    },
    subtitle2: {
      fontFamily: ralewayFont,
      color: black,
      fontSize: '1.5rem',
    },
    copyright: {
      fontFamily: ralewayFont,
    },
    body1: {
      fontFamily: ralewayFont,
    },
    body2: {
      fontFamily: ralewayFont,
    },
    button: {
      color: 'white',
      fontSize: '1.2rem',
      fontFamily: ralewayFont,
      textTransform: 'capitalize',
    },
    caption: {
      fontFamily: ralewayFont,
      fontSize: '1.3rem',
      color: 'darked',
      fontStyle: 'none',
    },
    iconButtonText: {
      fontFamily: ralewayFont,
      fontSize: '1rem',
      color: black,
      fontStyle: 'none',
    },
    header: {
      fontFamily: ralewayFont,
      fontSize: '2rem',
      color: 'white',
    },
  },
});
