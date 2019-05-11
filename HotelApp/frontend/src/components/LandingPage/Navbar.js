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
        cookie.remove('emp', {path: '/'});
    }

    render()
    {
        let navLogin = null;
        let redirectVar = null;

        if (cookie.load('cookie'))
        {
            console.log("Able to read cookie.. ");  
            navLogin = (
                <ul className = "nav navbar-nav navbar-right">
                    <li><Link to = "/" onClick = {this.handleLogout}><span className = "glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            )
            redirectVar = <Redirect to = "/home"/>
        }
        else
        {
            console.log("Not able to read cookie! Try logging in.. ");
            navLogin = (
                <ul className = "nav navbar-nav navbar-right">
                    <li><Link to = "/login"><span className = "glyphicon glyphicon-log-in"></span>Guest Login</Link></li>
                </ul>
            )
        }

        return(
            <div>
            <nav className = "navbar navbar-inverse">
                <div className = "container-fluid">
                    <ul className = "nav navbar-nav">
                        <li className = "active"><Link to = "/home">Home</Link></li>
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