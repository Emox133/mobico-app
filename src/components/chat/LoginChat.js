import React, {useState} from 'react'
import {v4 as uuidV4} from 'uuid'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const LoginChat = (props) => {
    const [fields, setFields] = useState({
        id: ''
    })
    const classes = useStyles()
    const {loginContainer} = classes

    const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.onSetId(fields.id)
    }

    const createNewId = () => {
        props.onSetId(uuidV4())
    }

    return (
        <form className={loginContainer} onSubmit={handleSubmit}>
            <TextField 
                id="id"
                name="id"
                value={fields.id}
                placeholder="Please provide your ID."
                variant="outlined"
                style={{marginBottom: '.3rem'}}
                required
                onChange={handleChange}
            />
        <div style={{display: 'flex'}}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{marginRight: '.3rem'}}
                >
                Submit
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={createNewId}
                >
                Create New Id
            </Button>
        </div>
        </form>
    )
}

export default LoginChat
