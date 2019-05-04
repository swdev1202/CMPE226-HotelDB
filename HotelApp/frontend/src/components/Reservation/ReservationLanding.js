import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ReservationLanding extends Component
{
    render(){
        return(
            <div>
                <h2>Reservation Page</h2>
                <div className = "table">
                    <ul>
                        <li><Link to ="/reservation/search">Search for available rooms</Link></li>
                        <li><Link to ="/reservation/make">Make a new reservation</Link></li>
                        <li><Link to ="/reservation/check">See My Reservations</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ReservationLanding;