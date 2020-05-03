import {useState} from 'react'

const themeObject = {
palette: {
  primary: { main: '#3f51b5' },
  secondary: { main: '#f50057' },
  type: 'dark'
},

spreadThis: {
  typography: {
    fontFamily: 'Courgette'
  },
  formWrapper: {
    height: '100%',
    textAlign: 'center',
    paddingBottom: '30px',
    // overflow: 'scroll'
  },
    image: {
      width: '300px',
      marginTop: '-30px'
    },
    title: {
      fontSize: '40px',
      letterSpacing: '5px'
    },
    textField: {
      margin: '5px auto'
    },
    button: {
      position: 'relative'
    },
    spinner: {
      position: 'absolute'
    },
    owner: {
      fontSize: '20px',
      fontWeight: 'bold'
    },
    card: {
      marginBottom: '10px',
      maxWidth: '300px',
      // border: '1px solid #fff'
    },
    post__card: {
      // boxShadow: '1rem 0 3rem rgba(0,0,0,.8)',

      '&:hover': {
        // transform: 'scale(.95)'
      }
    },
    userImage: {
      height: '200px',
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',

      '&:hover': {
      //  ...
      }
      // borderRadius: '0px'
    },
    paper: {
      height: '70vh',
      padding: '20px',
      position: 'fixed'
    },
    imageWrapper: {
      textAlign: 'center',
    },
    profileImage: {
      height: '250px',
      width: '50%',
      borderRadius: '50%',
      objectFit: 'fill'
    }
  }
}

export const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);

  const {palette: {type}} = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    }
    setTheme(updatedTheme);
  };

  return [theme, toggleDarkMode];
};