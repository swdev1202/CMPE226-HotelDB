import React, {Component} from 'react';
import Axios from 'axios';
import Calendar from 'react-calendar';

class Reservation extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            checkInDate_cal: new Date(),
            checkOutDate_cal: new Date()
        }
        this.submitDate = this.submitDate.bind(this);
    }

    onChange = checkInDate_cal => this.setState({ checkInDate_cal })
    onChange = checkOutDate_cal => this.setState({ checkOutDate_cal })

    submitDate = (e) => {
        const data = {
            checkInDate_cal: this.state.checkInDate_cal,
            checkOutDate_cal: this.state.checkOutDate_cal
        }
        Axios.post('http://localhost:3001/reservation', data);
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
                            <Calendar
                            onChange={this.onChange}
                            value={this.state.checkInDate_cal} />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            Check-Out Date: <br />
                            <Calendar
                            onChange={this.onChange}
                            value={this.state.checkOutDate_cal}/>
                        </div>
                        <div>
                            
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