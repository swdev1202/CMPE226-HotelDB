import React, {Component} from 'react';
import Axios from 'axios';

class OrderManage extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            order_table: []
        }
    }
    
    getAllOrders = (e) => {
        Axios.get('http://localhost:3001/frontdesk/view-order')
        .then(response => {
            this.setState({order_table: response.data}, function(){
                console.log(this.state.order_table)
            })
        })
    }

    render(){

        return(
            <div>
                <h2>Order Manage Page</h2>
                <div>
                    <button onClick={this.getAllOrders}>View Orders</button>
                    <table border = "1px" className = "table table-hover">
                            <thead>
                                <tr>
                                    <th>Guest ID</th>
                                    <th>Order Number</th>
                                    <th>Food ID</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.order_table.map(detail =>
                                    <tr key = {detail.guestID}>
                                        <td>{detail.guestID}</td>
                                        <td>{detail.orderNumber}</td>
                                        <td>{detail.foodID}</td>
                                        <td>{detail.quantity}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                </div>
            </div>
        )
    }
}

export default OrderManage;