import React, {Component} from 'react';
import Axios from 'axios';

class InvoiceManage extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            invoce_table: [],
            guest_id: "",
            invoice_date: "",
            room_charge: "",
            food_charge: "",
            invoice_num: ""
        }
        this.guestid_Handler = this.guestid_Handler.bind(this);
        this.invoicedate_Handler = this.invoicedate_Handler.bind(this);
        this.roomcharge_Handler = this.roomcharge_Handler.bind(this);
        this.foodcharge_Handler = this.foodcharge_Handler.bind(this);
        this.invoicenum_Handler = this.invoicenum_Handler.bind(this);
    }
    
    getAllInvoice = (e) => {
        Axios.get('http://localhost:3001/frontdesk/view-invoice')
        .then(response => {
            this.setState({invoice_table: response.data}, function(){
                console.log(this.state.invoice_table)
            })
        })
    }

    insertInvoice = (e) => {
        const data = {
            guestID: this.state.guest_id,
            invoiceDate: this.state.invoice_date,
            roomCharge: this.state.room_charge,
            foodCharge: this.state.food_charge
        }
        Axios.post('http://localhost:3001/frontdesk/insert-invoice', data)
        .then(response => {
            console.log(response);
        })
    }

    updateInvoice = (e) => {
        const data = {
            invoice_num: this.state.invoice_num,
            invoiceDate: this.state.invoice_date,
            roomCharge: this.state.room_charge,
            foodCharge: this.state.food_charge
        }
        Axios.post('http://localhost:3001/frontdesk/update-invoice', data)
        .then(response => {
            console.log(response);
        })
    }

    deleteInvoice = (e) => {
        const data = {
            invoice_num: this.state.invoice_num
        }
        Axios.post('http://localhost:3001/frontdesk/delete-invoice', data)
        .then(response => {
            console.log(response);
        })
    }


    guestid_Handler = (e) => {
        this.setState({
            guest_id: e.target.value
        })
    }

    invoicedate_Handler = (e) => {
        this.setState({
            invoice_date: e.target.value
        })
    }

    roomcharge_Handler = (e) => {
        this.setState({
            room_charge: e.target.value
        })
    }

    foodcharge_Handler = (e) => {
        this.setState({
            food_charge: e.target.value
        })
    }

    invoicenum_Handler = (e) => {
        this.setState({
            invoice_num: e.target.value
        })
    }


    render(){

        return(
            <div>
                <div>
                    <h2>Invoice Manage Page</h2>
                    <div>
                        <button onClick={this.getAllInvoice}>View Invoices</button>
                    </div>
                </div>

                <div>
                    <h2>Invoice Add</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Guest ID</th>
                                <th>Invoice Date</th>
                                <th>Room Charge</th>
                                <th>Food Charge</th>
                            </tr>
                            <tr>
                                <td>
                                    <input onChange = {this.guestid_Handler} type = "text" className = "form-control" name = "guestid" placeholder = "" required />   
                                </td>
                                <td>
                                    <input onChange = {this.invoicedate_Handler} type = "text" className = "form-control" name = "invoiceDate" placeholder = "YYYY-MM-DD" required />
                                </td>
                                <td>
                                    <input onChange = {this.roomcharge_Handler} type = "text" className = "form-control" name = "roomCharge" placeholder = "$" required />
                                </td>
                                <td>
                                    <input onChange = {this.foodcharge_Handler} type = "text" className = "form-control" name = "foodCharge" placeholder = "$" required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.insertInvoice}>Insert</button>
                </div>

                <div>
                    <h2>Invoice Update</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Invoice Number</th>
                                <th>Invoice Date</th>
                                <th>Room Charge</th>
                                <th>Food Charge</th>
                            </tr>
                            <tr>
                                <td>
                                    <input onChange = {this.invoicenum_Handler} type = "text" className = "form-control" name = "invoiceNum" placeholder = "" required />   
                                </td>
                                <td>
                                    <input onChange = {this.invoicedate_Handler} type = "text" className = "form-control" name = "invoiceDate" placeholder = "YYYY-MM-DD" required />
                                </td>
                                <td>
                                    <input onChange = {this.roomcharge_Handler} type = "text" className = "form-control" name = "roomCharge" placeholder = "$" required />
                                </td>
                                <td>
                                    <input onChange = {this.foodcharge_Handler} type = "text" className = "form-control" name = "foodCharge" placeholder = "$" required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.updateInvoice}>Update</button>
                </div>

                <div>
                    <h2>Invoice Delete</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Invoice Number</th>
                            </tr>
                            <tr>
                                <td>
                                    <input onChange = {this.invoicenum_Handler} type = "text" className = "form-control" name = "invoiceNum" placeholder = "" required />   
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.deleteInvoice}>Delete</button>
                </div>
            </div>
        )
    }
}

export default InvoiceManage;