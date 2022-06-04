import React from 'react';
import LoginButton from './login';
import HeaderMain from './headerMain';

export default function LoginView () {
    
    return (
        <div>

            <header className="px-12 py-7 flex items-center bg-blue-400">

            <element className="mr-4 text-xl  font-bold">
                CalendApp
            </element>

            <element className=""  style={{marginLeft: 55 + 'em'}} >
                <LoginButton/>
            </element>

            </header>

            <div class='main'>
                <HeaderMain/>
            </div>
        </div>


    );
}