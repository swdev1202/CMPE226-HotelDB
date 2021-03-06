import React, {Component} from 'react';
import Axios from 'axios';
import Calendar from 'react-calendar';

class ReservationSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            checkInDate_cal: new Date(),
            checkOutDate_cal: new Date(),
            occupancy: []
        }
        this.submitDate = this.submitDate.bind(this);
    }

    onChange_in = checkInDate_cal => this.setState({ checkInDate_cal })
    onChange_out = checkOutDate_cal => this.setState({ checkOutDate_cal })

    submitDate = (e) => {
        const data = {
            checkInDate_cal: this.state.checkInDate_cal,
            checkOutDate_cal: this.state.checkOutDate_cal
        }
        Axios.post('http://localhost:3001/reservation/search', data)
        .then(response => {
            this.setState({occupancy: response.data}, function(){
                console.log(this.state.occupancy)
            })
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
                            <button className = "btn btn-success" type = "button" onClick = {this.submitDate}>Search</button>
                        </div>
                        <h2>Search Results (std:standard, lux:luxury, sui:suite)</h2>
                        <table border = "1px" className = "table table-hover">
                                <thead>
                                    <tr>
                                        <th>Room Number</th>
                                        <th>Room Type</th>
                                        <th>Room Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.occupancy.map(detail =>
                                    <tr key = {detail.roomNumber}>
                                        <td>{detail.roomNumber}</td>
                                        <td>{detail.roomType}</td>
                                        <td>{detail.roomPrice}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}

export default ReservationSearch;