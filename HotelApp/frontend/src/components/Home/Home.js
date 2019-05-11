import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

// should not be able to create a user once user is logged in

class Home extends Component
{
    render()
    {
        let redirectVar = null;
        let cookie_info = cookie.load('cookie')
        if(cookie_info){
            redirectVar = <Redirect to = "/guestmain"/>
        }

        let cookie_emp = cookie.load('emp')
        if(cookie_emp){
            redirectVar = <Redirect to = "/frontdesk"/>
        }
        return(
            <div>
                <h1>Welcome to our Hotel</h1>
                <p>Please log into your account or create an account if you don't have one!</p>
                {redirectVar}
            </div>
        )
    }
}
export default Home;