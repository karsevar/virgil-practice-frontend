import React, {useState} from 'react';
import axios from 'axios';

function DevSignup() {
    const [credentials, setCredentials] = useState({identity: ''})

    const login = e => {
        e.preventDefault();
        axios
            .post('https://soupkitchen-buildweek.herokuapp.com/api/register', credentials)
            .then(res => {
                console.log(res)
                // localStorage.setItem('token', res.data.token)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = e => {
        console.log(credentials) 
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='login-container'>
            <form onSubmit={login}>
                <input
                    type='text'
                    name='identity'
                    value={credentials.identity}
                    onChange={handleChange}
                />
                <button>Submit!</button>
            </form>
            
        </div>
    )
}

export default DevSignup;