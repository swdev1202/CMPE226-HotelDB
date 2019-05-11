import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';

class Invoice extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            invoice_list:[]
        }
        this.requestInvoice = this.requestInvoice.bind(this);
    }

    requestInvoice = (e) => {
        // first obtain the user id from the session management
        const data = {
            guestid: cookie.load('cookie')
        }

        Axios.post("http://localhost:3001/invoice", data)
        .then(response => {
            this.setState({invoice_list:response.data}, function(){
                console.log(this.state.invoice_list)
            })
        })
    }

    render(){
        return(
            <div>
                <h2>Your Invoice</h2>
                <div style = {{width: '30%'}}>
                    <button className = "btn btn-success" type = "button" onClick = {this.requestInvoice}>View</button>
                </div>
                <table border = "1px" className = "table table-hover">
                    <thead>
                        <tr>
                            <th>Invoice Date</th>
                            <th>Room Charge</th>
                            <th>Food Charge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.invoice_list.map(detail =>
                            <tr key = {detail.invoiceNum}>
                                <td>{detail.invoiceDate.slice(0,10)}</td>
                                <td>{detail.roomCharge}</td>
                                <td>{detail.foodCharge}</td>
                            </tr>
                         )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Invoice;