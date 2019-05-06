import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () =>
    {
        cookie.remove('cookie', {path: '/'});
    }

    render()
    {
        let navLogin = null;

        if (cookie.load('cookie'))
        {
            console.log("Able to read cookie.. ");
            navLogin = (
                <ul class = "nav navbar-nav navbar-right">
                    <li><Link to = "/" onClick = {this.handleLogout}><span class = "glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            )
        }
        else
        {
            console.log("Not able to read cookie! Try logging in.. ");
            navLogin = (
                <ul class = "nav navbar-nav navbar-right">
                    <li><Link to = "/login"><span class = "glyphicon glyphicon-log-in"></span>Guest Login</Link></li>
                </ul>
            )
        }

        let redirectVar = null;
        if (cookie.load('cookie'))
        {
            redirectVar = <Redirect to = "/home"/>
        }

        return(
            <div>
               {redirectVar}
            <nav class = "navbar navbar-inverse">
                <div class = "container-fluid">
                    <ul class = "nav navbar-nav">
                        <li class = "active"><Link to = "/home">Home</Link></li>
                        <li><Link to = "/create">Create Guest Account</Link></li>
                        <li><Link to = "/empcreate">Create Employee Account</Link></li>
                        <li><Link to = "/empLogin">Employee Login</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
            </div>
        )
    }
}

export default Navbar;