import React, {Component} from 'react';
import Axios from 'axios';

class ReservationCheck extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            reservation_table: []
        }
    }

    checkReservation = (e) => {
        const data = {
            guestid: 5 // will be replaced with the current session's guest id
        }
        Axios.post('http://localhost:3001/reservation/check', data)
        .then(response => {
            this.setState({reservation_table: response.data}, function(){
                console.log(this.state.reservation_table)
            })
        })
    }

    render(){
        const {data} = this.state.reservation_table;
        return(
            <div>
                <h2>Your Reservation</h2>
                <div style = {{width: '30%'}}>
                    <button className = "btn btn-success" type = "button" onClick = {this.checkReservation}>Get</button>
                </div>
                <div className = "checking">
                    <p>{data}</p>
                </div>
            </div>
        )
    }
}

export default ReservationCheck;