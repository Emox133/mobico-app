import React, {useEffect, useState} from 'react'

import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import User from '../components/users/User'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  searchTypography: {
    marginTop: '1rem'
  },
  searchInput: {
    marginBottom: '1rem'
  }
})

const SearchUsers = () => {
    const [fields, setFields] = useState({
      query: ''
    })

    const classes = useStyles()
    const {searchTypography, searchInput} = classes

    const {allUsers} = useSelector(state => ({
      allUsers: state.user.allUsers
    }), shallowEqual)

    const dispatch = useDispatch()


    const handleChange = e => {
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    let term = allUsers.filter(user => user.username.includes(fields.query))

    useEffect(() => {
      dispatch(getAllUsers())
    }, [dispatch])

    let content = term.map(user => {
      return <User key={user._id} user={user}/>
    })

    return (
        <Container>
            <Typography variant="h4" align="center" classes={{root: searchTypography}}>
                Search for friends etc...
            </Typography>

            <TextField 
                type="text"
                name="query"
                id="query"
                fullWidth
                label="Example: @Lary2993"
                autoComplete="off"
                classes={{root: searchInput}}
                onChange={handleChange}
                />
              {content}
          </Container>
    )
  }

export default SearchUsers
