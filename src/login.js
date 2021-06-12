import {Button} from '@material-ui/core';
import './login.css';
import {auth, provider} from './firebase';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import { useStateValue } from './stateProvider';
import {actionTypes} from './reducer'

export default function Login() {

    const [err, setErr] = useState(null);
    const [{user}, dispatch] = useStateValue();

    const signIn = async e => {
        e.preventDefault();
        
        auth
            .signInWithPopup(provider)
            .then((result) => dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            }))


    }

    return (
        <div className='login'>
            <div className='login__container'>

            

            <div className='login__text'>
                <h1>Log in</h1>
            </div>

            <Button type='submit' onClick={(e)=>signIn(e)} >
                Sign in
            </Button>
            </div>
        </div>
    )
}