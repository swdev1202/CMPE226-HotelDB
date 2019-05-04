import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FrontdeskMain extends Component
{
    // will have to check if this employee is a frontdesk or hr

    render(){

        return(
            <div>
                <h2>Frontdesk Page</h2>
                <div className = "table">
                    <ul>
                        <li><Link to = "/frontdesk/manage-room">Manage Room</Link></li>
                        <li><Link to = "/frontdesk/manage-reservation">Manage Reservation</Link></li>
                        <li><Link to = "/frontdesk/manage-invoice">Manage Invoice</Link></li>
                        <li><Link to = "/frontdesk/manage-order">Manage Order</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default FrontdeskMain;