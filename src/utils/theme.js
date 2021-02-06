import {useState} from 'react'

const themeObject = {
palette: {
  // primary: { main: '#f44336' },
  primary: { main: '#00c9ff' },
  secondary: { main: '#ff0011' },
  type: 'light'
},

spreadThis: {
  typography: {
    fontFamily: 'Courgette'
  },
  formWrapper: {
    height: '100%',
    textAlign: 'center',
    paddingBottom: '-15px',
    // overflow: 'scroll'
  },
    logo: {
      width: '300px',
      height: '260px',
      marginTop: '-30px'
    },
    title: {
      fontSize: '40px',
      letterSpacing: '5px'
    },
    textField: {
      marginBottom: '5px'
    },
    owner: {
      fontSize: '20px',
      fontWeight: 'bold',
      alignItems: 'center'
    },
    card: {
      maxWidth: '300px',
      marginBottom: '10px',
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
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',

      '&:hover': {
      //  ...
      }
      // borderRadius: '0px'
    },
    paper: {
      height: '100vh',
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
    },
    postImage:{
      height: '250px',
      width: '30%',
      borderRadius: '50%'
    },

    // MEDIA QUERY STYLING
    cardSmall: {
      maxWidth: '400px',
      margin: '0 auto 10px auto'
    },
    postImageSmall: {
      height: '160px',
      width: '50%',
      borderRadius: '50%',
      marginBottom: '.8rem'
    },
    logoSmall: {
      width: '245px',
      marginTop: '-30px'
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