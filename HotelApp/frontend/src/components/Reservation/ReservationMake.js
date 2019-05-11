import React, {Component} from 'react';
import Axios from 'axios';
import Calendar from 'react-calendar';
import cookie from 'react-cookies';

class ReservationMake extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            checkInDate_cal: new Date(),
            checkOutDate_cal: new Date(),
            roomNumber: ""
        }
        this.submitReservation = this.submitReservation.bind(this);
        this.roomNumber_Handler = this.roomNumber_Handler.bind(this);
    }

    onChange_in = checkInDate_cal => this.setState({ checkInDate_cal })
    onChange_out = checkOutDate_cal => this.setState({ checkOutDate_cal })

    roomNumber_Handler = (e) => {
        this.setState({
            roomNumber: e.target.value
        })
    }

    submitReservation = (e) => {
        const data = {
            checkInDate_cal: this.state.checkInDate_cal,
            checkOutDate_cal: this.state.checkOutDate_cal,
            roomNumber: this.state.roomNumber,
            userID: cookie.load('cookie')
        }
        Axios.post('http://localhost:3001/reservation/make', data)
        .then(response => {
            console.log(response);
        })
    }

    render(){
        return(
            <div>
                <h2>Search for available dates</h2>
                <div className = "container">
                    <form>
                        <div style = {{width: '30%'}} className = "form-group">
                            Check-In Date: <br />
                            <Calendar
                            onChange={this.onChange_in}
                            value={this.state.checkInDate_cal} />
                        </div>

                        <div style = {{width: '30%'}} className = "form-group">
                            Check-Out Date: <br />
                            <Calendar
                            onChange={this.onChange_out}
                            value={this.state.checkOutDate_cal}/>
                        </div>
                        <div>

                        <div style = {{width: '30%'}} className = "form-group">
                            <br />Room Number <br />
                            <input onChange = {this.roomNumber_Handler} type = "text" className = "form-control" name = "roomNum" placeholder = "room number" required />
                        </div>

                        </div>
                        <div style = {{width: '30%'}}>
                            <br />
                            <button type="submit" className = "btn btn-success" onClick = {this.submitReservation}>submit</button>
                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ReservationMake;