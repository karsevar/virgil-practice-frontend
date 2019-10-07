import React, {useState} from 'react';
import axios from 'axios';
import {EThree} from '@virgilsecurity/e3kit';

function DevSignup() {
    const [credentials, setCredentials] = useState({identity: ''})

    async function login(e) {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/authenticate', credentials)
        // console.log(response.data.authToken)
        const authToken = response.data.authToken
        console.log(authToken)

        async function getVirgilToken() {
            const response_me = await axios.get('http://localhost:4000/virgil-jwt', {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                }})

            return response_me.data.virgilToken
        }

        const ethreeStuff = EThree.initialize(getVirgilToken);

        const ethreeResponse = await ethreeStuff
        console.log(ethreeResponse)
        ethreeResponse.register()
        //ethreeResponse.register();
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