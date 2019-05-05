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
        return(
            <div>
                <h2>Your Reservation</h2>
                <div style = {{width: '30%'}}>
                    <button className = "btn btn-success" type = "button" onClick = {this.checkReservation}>Get</button>
                </div>
                <table border = "1px" className = "table table-hover">
                    <thead>
                        <tr>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Room Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reservation_table.map(detail =>
                            <tr key = {detail.bookNumber}>
                                <td>{detail.beginDate}</td>
                                <td>{detail.endDate}</td>
                                <td>{detail.roomNum}</td>
                            </tr>
                         )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ReservationCheck;