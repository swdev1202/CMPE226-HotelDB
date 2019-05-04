import React, {Component} from 'react';
import Axios from 'axios';

class RoomManage extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            room_table: [],
            roomNumber: "",
            newStatus: "",
        }
        this.roomNumber_Handler = this.roomNumber_Handler.bind(this);
        this.roomStatus_Handler = this.roomStatus_Handler.bind(this);
    }
    
    getAllRooms = (e) => {
        Axios.get('http://localhost:3001/frontdesk/view-room')
        .then(response => {
            this.setState({room_table: response.data}, function(){
                console.log(this.state.room_table)
            })
        })
    }

    updateRoom = (e) => {
        const data = {
            roomNumber: this.state.roomNumber,
            newStatus: this.state.newStatus
        }
        Axios.post('http://localhost:3001/frontdesk/update-room', data)
        .then(response => {
            console.log(response);
        })
    }

    roomNumber_Handler = (e) => {
        this.setState({
            roomNumber: e.target.value
        })
    }

    roomStatus_Handler = (e) => {
        this.setState({
            newStatus: e.target.value
        })
    }

    render(){

        return(
            <div>
                <h2>Room Manage Page</h2>
                <div>
                    <button onClick={this.getAllRooms}>View Rooms</button>
                </div>

                <h2>Room Status Change</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Room Number</th>
                            <th>New Room Status</th>
                        </tr>
                        <tr>
                            <td>
                                <input onChange = {this.roomNumber_Handler} type = "text" className = "form-control" name = "roomNum" placeholder = "" required />   
                            </td>
                            <td>
                                <input onChange = {this.roomStatus_Handler} type = "text" className = "form-control" name = "newStatus" placeholder = "[0-3]" required />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.updateRoom}>Update</button>
            </div>
        )
    }
}

export default RoomManage;