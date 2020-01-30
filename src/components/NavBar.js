import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";



export default class NavBar extends React.Component {



    render(){
        return (
            <div className="Header">
                <div className="Header-item flex-1">
                    Snap Draft
                </div>
                <div className="Header-item">
                    <Link to='/mission-statement'>About</Link>
                </div>
                <div className="Header-item">
                    <Link to='/login'>Login</Link>
                </div>
                <div className="Header-item">
                    <Link to={`/users/${localStorage.getItem('user_id')}/dashboard`}>DashBoard</Link>
                </div>
            </div>
        )
    }
}