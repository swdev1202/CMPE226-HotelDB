import React, {Component} from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';

class FoodOrder extends Component
{
    
    constructor(props)
    {
        super(props);
        
        this.state = 
        {
            guest_id: "",   /*==== can be removed when integrating with guest logged-in session ====*/ 
            response_data: [],
            orders: []
        }
        this.food_quantityHandler = this.food_quantityHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
        
        Axios.get('http://localhost:3001/FoodOrder')
        .then(response => {
                this.setState({response_data: response.data}, function(){
                    //console.log(this.state.response_data);
                })
            })
    }
    
    food_quantityHandler = (e) => {
        this.setState({
        orders: {...this.state.orders, [e.target.name]: e.target.value}
        })
        //console.log(this.state.orders);
    }

    submitCreate = (e) => {
        const data = {
            guest_id: cookie.load('cookie'),
            orders: this.state.orders
        }
        console.log(data);
        Axios.post('http://localhost:3001/FoodOrder', data)
        window.alert("Order Placed")
        window.location.reload();
    }

    /*==== user_id with its input below in render() ====*/
    /*==== can be removed when integrating with guest logged-in session ====*/ 
    render(){
        return(
            <div>
                <br />
                <h2>Food Menu</h2>
                
                <div className = "container">
                    <div className = "panel panel-default p50 uth-panel">
                        <table border = "1px" className = "table table-hover">
                            <thead><tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Order Quantity</th>
                            </tr></thead>

                            <tbody>
                                {this.state.response_data.map(detail =>
                                    <tr key = {detail.foodID}>
                                        <td>{detail.foodID}</td>
                                        <td>{detail.foodCategory}</td>
                                        <td>{detail.foodName}</td>
                                        <td>${detail.foodPrice}</td>
                                <td><input onChange = {this.food_quantityHandler} type = "number" className = "form-control" name = {detail.foodID} placeholder = "0" required /></td>
                                        
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style = {{width: '30%'}}>
                    <br />
                    <button className = "btn btn-success" type="submit" onClick = {this.submitCreate}>Submit Order</button>
                </div>
                
                <br />
            </div>
        )
    }
}

export default FoodOrder;