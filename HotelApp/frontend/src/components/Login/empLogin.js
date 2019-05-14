import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class empLogin extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            emp_id: "",
            password: "",
            authFlag: false
        }

        this.emp_idHandler = this.emp_idHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount(){
        this.setState({
            authFlag: false
        })
    }

    emp_idHandler = (e) =>
    {
        this.setState({
            emp_id: e.target.value
        })
    }

    passwordHandler = (e) =>
    {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = (e) =>
    {
        e.preventDefault();

        const data = 
        {
            emp_id: this.state.emp_id,
            password: this.state.password
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/emplogin', data)
        .then(response => {
            console.log("Status code: ", response.status);

            if (response.status === 200){
                window.alert("Log In Success");
                this.setState({
                    authFlag: true
                })
            }
            else{
                window.alert("Log In Failed");
                this.setState({
                    authFlag: false
                })
            }
        });
    }

    render()
    {
        let redirectVar = null;

        if (cookie.load('cookie'))
        {
            redirectVar = <Redirect to = "/home" />
        }

        return(
            <div>
                {redirectVar}
            <div className = "container">
                <div className = "login-form">
                    <div className = "main-div">
                        <div className = "panel">
                            <h2>Employee Login:</h2>
                            <p>Please enter your Employee ID and password:</p>
                        </div>

                        <div className = "form-group">
                            <input onChange = {this.emp_idHandler} type = "text" className = "form-control" name = "emp_id" placeholder = "Employee ID" required />
                        </div>

                        <div className = "form-group">
                            <input onChange = {this.passwordHandler} type = "password" className = "form-control" name = "password" placeholder = "Password" required/>
                        </div>

                        <button onClick = {this.submitLogin} className = "btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default empLogin;