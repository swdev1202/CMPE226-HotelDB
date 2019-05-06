import React, {Component} from 'react';

// should not be able to create a user once user is logged in

class Home extends Component
{
    render()
    {
        return(
            <div>
                <h1>Welcome to our Hotel</h1>
                <p>Please log into your account or create an account if you don't have one!</p>
            </div>
        )
    }
}
export default Home;