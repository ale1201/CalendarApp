import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton () {
    const { loginWithRedirect } = useAuth0();
    
    return (
            <button
            className=" p-2 rounded-full shadow-md hover:shadow-2xl w-30 bg-blue-200 "
            onClick={() => loginWithRedirect({redirectUri:'http://localhost:3000/main'})}
            >
            <span className="pl-5 pr-5 ">  Ingresa </span>
        </button>
    );
}