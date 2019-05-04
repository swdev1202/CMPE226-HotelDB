import React, {Component} from 'react';
import Axios from 'axios';

class ReservationManage extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            reservation_table: [],
            check_in_date: "",
            check_out_date: "",
            guest_id: "",
            room_number: "",
            reserve_number: ""
        }
        this.checkin_Handler = this.checkin_Handler.bind(this);
        this.checkout_Handler = this.checkout_Handler.bind(this);
        this.guestid_Handler = this.guestid_Handler.bind(this);
        this.roomnum_Handler = this.roomnum_Handler.bind(this);
        this.reservenum_Handler = this.reservenum_Handler.bind(this);

    }
    
    getAllReservations = (e) => {
        Axios.get('http://localhost:3001/frontdesk/view-reservation')
        .then(response => {
            this.setState({reservation_table: response.data}, function(){
                console.log(this.state.reservation_table);
            })
        })
    }

    insertReservation = (e) => {
        const data = {
            checkIn: this.state.check_in_date,
            checkOut: this.state.check_out_date,
            guestId: this.state.guest_id,
            roomNum: this.state.room_number
        }
        Axios.post('http://localhost:3001/frontdesk/insert-reservation', data)
        .then(response => {
            console.log(response);
        })
    }

    deleteReservation = (e) => {
        const data = {
            reservation_number: this.state.reserve_number
        }
        Axios.post('http://localhost:3001/frontdesk/delete-reservation', data)
        .then(response => {
            console.log(response);
        })
    }

    checkin_Handler = (e) => {
        this.setState({
            check_in_date: e.target.value
        })
    }

    checkout_Handler = (e) => {
        this.setState({
            check_out_date: e.target.value
        })
    }

    guestid_Handler = (e) => {
        this.setState({
            guest_id: e.target.value
        })
    }

    roomnum_Handler = (e) => {
        this.setState({
            room_number: e.target.value
        })
    }

    reservenum_Handler = (e) => {
        this.setState({
            reserve_number: e.target.value
        })
    }

    render(){

        return(
            <div>
                <div>
                    <h2>Reservation Manage Page</h2>
                    <div>
                        <button onClick={this.getAllReservations}>View Reservations</button>
                    </div>
                </div>

                <div>
                    <h2>Reservation Add</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Check-In Date</th>
                                <th>Check-Out Date</th>
                                <th>Guest ID</th>
                                <th>Room Number</th>
                            </tr>
                            <tr>
                                <td>
                                    <input onChange = {this.checkin_Handler} type = "text" className = "form-control" name = "checkin" placeholder = "YYYY-MM-DD" required />   
                                </td>
                                <td>
                                    <input onChange = {this.checkout_Handler} type = "text" className = "form-control" name = "checkout" placeholder = "YYYY-MM-DD" required />
                                </td>
                                <td>
                                    <input onChange = {this.guestid_Handler} type = "text" className = "form-control" name = "guestID" placeholder = "guest's ID" required />
                                </td>
                                <td>
                                    <input onChange = {this.roomnum_Handler} type = "text" className = "form-control" name = "newStatus" placeholder = "room number" required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.insertReservation}>Insert</button>
                </div>

                <div>
                    <h2>Reservation Delete (Manager Only)</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Reservation Number</th>
                            </tr>
                            <tr>
                                <td>
                                    <input onChange = {this.reservenum_Handler} type = "text" className = "form-control" name = "reserveNum" placeholder = "" required />   
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.deleteReservation}>Delete</button>
                </div>

            </div>
        )
    }
}

export default ReservationManage;