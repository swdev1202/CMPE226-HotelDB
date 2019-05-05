/*CMPE226 Team7*/
import React, {Component} from 'react';
import '../../App.css';
import Axios from 'axios';

class Create extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            guest_id: "",
            firstname: "",
            lastname: "",
            phone_number: "",
            password: ""
        }

        this.guest_idHandler = this.guest_idHandler.bind(this);
        this.firstnameHandler = this.firstnameHandler.bind(this);
        this.lastnameHandler = this.lastnameHandler.bind(this);
        this.phone_numberHandler = this.phone_numberHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);

        this.submitCreate = this.submitCreate.bind(this);
    }

    guest_idHandler = (e) => {
        this.setState({
            guest_id: e.target.value
        })
    }

    firstnameHandler = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }

    lastnameHandler = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }

    phone_numberHandler = (e) => {
        this.setState({
            phone_number: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitCreate = (e) => {
        const data = {
            guest_id: this.state.guest_id,
            firstname: this.state.firstname,
            lastname: this.state.lastname, 
            phone_number: this.state.phone_number,
            password: this.state.password
        }

        Axios.post('http://localhost:3001/create', data);
    }

    render(){
        /*
        return(
            <div>
                <h2>Create a New User</h2>

                <br />
                <div className = "container">
                    <form>
                        <div style = {{width: '30%'}} className = "form-group">
                            Guest ID: <br />
                            <input onChange = {this.guest_idHandler} type = "text" className = "form-control" name = "guest_id" placeholder = "Guest ID" required />
                        </div>

                        <div style = {{width: '30%'}} className = "form-group">
                            <br />First name: <br />
                            <input onChange = {this.firstnameHandler} type = "text" className = "form-control" name = "firstname" placeholder = "First name" required />   
                        </div>

                        <div style = {{width: '30%'}} className = "form-group">
                            <br />Last name: <br />
                            <input onChange = {this.lastnameHandler} type = "text" className = "form-control" name = "lastname" placeholder = "Last name" required />
                        </div>

                        <div style = {{width: '30%'}} className = "form-group">
                            <br />Phone number: <br />
                            <input onChange = {this.phone_numberHandler} type = "text" className = "form-control" name = "phone_number" placeholder = "Phone number" required />
                        </div>

                        <div style = {{width: '30%'}} className = "form-group">
                            <br />Password: <br />
                            <input onChange = {this.passwordHandler} type = "password" className = "form-control" name = "password" placeholder = "Password" required />
                        </div>

                        <div style = {{width: '30%'}}>
                            <br />
                            <button className = "btn btn-success" type = "submit" onClick = {this.submitCreate}>Create New User</button>
                        </div>
                    </form>
                </div>
            </div>
        )*/
        return(
            <div class = "container">
                <div class = "login-form">
                    <div class = "main-div">
                        <div class = "panel">
                            <h2>Create a New Guest Account:</h2>
                            <p>Please enter your Guest ID, first name, last name, phone number and a password to set up an account:</p>
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.guest_idHandler} type = "text" class = "form-control" name = "guest_id" placeholder = "Guest ID" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.firstnameHandler} type = "text" class = "form-control" name = "firstname" placeholder = "First name" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.lastnameHandler} type = "text" class = "form-control" name = "lastname" placeholder = "Last name" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.phone_numberHandler} type = "text" class = "form-control" name = "phone_number" placeholder = "Phone number" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.passwordHandler} type = "password" class = "form-control" name = "password" placeholder = "Password" />
                        </div>
                        <br></br>
                        <button onClick = {this.submitCreate} class = "btn btn-primary">Create Account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;