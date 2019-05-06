import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

class empCreate extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            emp_id: "",
            ssh: "",
            firstname: "",
            lastname: "",
            dob: "",
            salary: "",
            password: "",
            dno: ""
        }

        this.emp_idHandler = this.emp_idHandler.bind(this);
        this.ssn_Handler = this.ssn_Handler.bind(this);
        this.firstname_Handler = this.firstname_Handler.bind(this);
        this.lastname_Handler = this.lastname_Handler.bind(this);
        this.dob_Handler = this.dob_Handler.bind(this);
        this.salary_Handler = this.salary_Handler.bind(this);
        this.password_Handler = this.password_Handler.bind(this);
        this.dno_Handler = this.dno_Handler.bind(this);

        this.submitCreate = this.submitCreate.bind(this);
    }

    emp_idHandler = (e) => 
    {
        this.setState({
            emp_id: e.target.value
        })
    }

    ssn_Handler = (e) => 
    {
        this.setState({
            ssn: e.target.value
        })
    }

    firstname_Handler = (e) => 
    {
        this.setState({
            firstname: e.target.value
        })
    }

    lastname_Handler = (e) => 
    {
        this.setState({
            lastname: e.target.value
        })
    }

    dob_Handler = (e) => 
    {
        this.setState({
            dob: e.target.value
        })
    }

    salary_Handler = (e) => 
    {
        this.setState({
            salary: e.target.value
        })
    }

    password_Handler = (e) => 
    {
        this.setState({
            password: e.target.value
        })
    }

    dno_Handler = (e) => 
    {
        this.setState({
            dno: e.target.value
        })
    }

    submitCreate = (e) =>
    {
        const data = 
        {
            emp_id: this.state.emp_id,
            ssn: this.state.ssn,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            dob: this.state.dob,
            salary: this.state.salary,
            password: this.state.password,
            dno: this.state.dno
        }

        axios.post('http://localhost:3001/empcreate', data);
    }

    render()
    {
        return(
            <div class = "container">
                <div class = "login-form">
                    <div class = "main-div">
                        <div class = "panel">
                            <h2>Create a New Employee Account:</h2>
                            <p>Please enter the Employee's ID, SSN, first name, last name, DOB, salary, password and DNO:</p>
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.emp_idHandler} type = "text" class = "form-control" name = "emp_id" placeholder = "Employee ID" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.ssn_Handler} type = "text" class = "form-control" name = "ssn" placeholder = "SSN" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.firstname_Handler} type = "text" class = "form-control" name = "firstname" placeholder = "First name" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.lastname_Handler} type = "text" class = "form-control" name = "lastname" placeholder = "Last name" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.dob_Handler} type = "text" class = "form-control" name = "dob" placeholder = "DOB" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.salary_Handler} type = "text" class = "form-control" name = "salary" placeholder = "Salary" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.password_Handler} type = "password" class = "form-control" name = "password" placeholder = "Password" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.dno_Handler} type = "text" class = "form-control" name = "dno" placeholder = "DNO" />
                        </div>

                        <br></br>

                        <button onClick = {this.submitCreate} class = "btn btn-primary">Create Account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default empCreate;