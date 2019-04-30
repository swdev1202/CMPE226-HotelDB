import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Create from './Create/Create';
import Reservation from './Reservation/Reservation';

// Create a Main Component
class Main extends Component
{
    render()
    {
        return(
            <div>
                {/*Render different components based on route*/}
                <Route path = "/Create" component = {Create} />
                <Route path = "/Reservation" component = {Reservation} />
            </div>
        )
    }
}

export default Main;