import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Create from './Create/Create';
import empCreate from './Create/empCreate';

import Home from './Home/Home';
import Navbar from './LandingPage/Navbar';

import Login from './Login/Login';
import empLogin from './Login/empLogin';

import GuestMain from './GuestMainPage/GuestMain';

import Invoice from './Invoice/Invoice';

import ReservationLanding from './Reservation/ReservationLanding';
import ReservationSearch from './Reservation/ReservationSearch';
import ReservationMake from './Reservation/ReservationMake';
import ReservationCheck from './Reservation/ReservationCheck';

import FrontdeskMain from './Employee/FrontdeskMain';
import RoomManage from './Employee/RoomManage';
import ReservationManage from './Employee/ReservationManage';
import InvoiceManage from './Employee/InvoiceManage';
import OrderManage from './Employee/OrderManage';

class Main extends Component
{
    render()
    {
        return(
            <div>
                {}
                <Route path = "/" component = {Navbar} />
                <Route path = "/home" component = {Home} />
                <Route path = "/create" component = {Create} />
                <Route path = "/empcreate" component = {empCreate} />
                <Route path = "/login" component = {Login} />
                <Route path = "/emplogin" component = {empLogin} />
                <Route path = "/guestmain" component = {GuestMain} />
                <Route path = "/invoice" component = {Invoice} />
                <Route path = "/reservation" component = {ReservationLanding} />
                <Route path = "/reservation/search" component = {ReservationSearch} />
                <Route path = "/reservation/make" component = {ReservationMake} />
                <Route path = "/reservation/check" component = {ReservationCheck} />
                <Route path = "/frontdesk" component = {FrontdeskMain} />
                <Route path = "/frontdesk/manage-room" component = {RoomManage} />
                <Route path = "/frontdesk/manage-reservation" component = {ReservationManage} />
                <Route path = "/frontdesk/manage-invoice" component = {InvoiceManage} />
                <Route path = "/frontdesk/manage-order" component = {OrderManage} />
            </div>
        )
    }
}

export default Main;