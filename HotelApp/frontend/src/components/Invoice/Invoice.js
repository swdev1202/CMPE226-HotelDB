import React, {Component} from 'react';
import Axios from 'axios';

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
            guestid: 5
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
                    <button className = "btn btn-success" type = "button" onClick = {this.requestInvoice}>Check</button>
                </div>
            </div>
        )
    }
}

export default Invoice;