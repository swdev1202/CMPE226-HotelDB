import React, {Component} from 'react';
import Axios from 'axios';

class Reservation extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            checkInDate: "",
            checkOutDate: ""
        }

        this.checkInDate = this.checkInDateHandler.bind(this);
        this.checkOutDate = this.checkOutDateHandler.bind(this);
        this.submitDate = this.submitDate.bind(this);
    }

    checkInDateHandler = (e) => {
        this.setState({
            checkInDate: e.target.value
        })
    }

    checkOutDateHandler = (e) => {
        this.setState({
            checkOutDate: e.target.value
        })
    }

    submitDate = (e) => {
        const data = {
            checkInDate: this.state.checkInDate,
            checkOutDate: this.state.checkOutDate
        }
    }

    render(){
        return(
            <div>
                <h2>Search for available dates</h2>

                <br />
                <div class = "container">
                    <form>
                        <div style = {{width: '30%'}} class = "form-group">
                            Check-In Date: <br />
                            <input onChange = {this.checkInDateHandler} type = "text" class = "form-control" name = "checkInDate" placeholder = "MM/DD/YYYY" required />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            Check-Out Date: <br />
                            <input onChange = {this.checkOutDateHandler} type = "text" class = "form-control" name = "checkOutDate" placeholder = "MM/DD/YYYY" required />   
                        </div>

                        <div style = {{width: '30%'}}>
                            <br />
                            <button class = "btn btn-success" type = "submit" onClick = {this.submitDate}>Search</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Reservation;