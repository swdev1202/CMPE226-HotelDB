import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GuestMain extends Component
{
    render(){
        return(
            <div>
                <h2>Guest Page</h2>
                <div class = "table">
                    <ul>
                        <li><Link to = "/reservation">Reservation</Link></li>
                        <li><Link to = "/invoice">Invoice</Link></li>
                        <li><Link to = "/order">Food  Order</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default GuestMain;