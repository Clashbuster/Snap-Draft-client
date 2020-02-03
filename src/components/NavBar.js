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

    userId(){
        let output = localStorage.getItem('user_id')
        return output
    }

    render(){
        return (
            <div className="Header position-sticky top-0">
                <div className="Header-item flex-1">
                    Snap Draft
                </div>
                <div className="Header-item">
                    <Link to='/mission-statement'>About</Link>
                </div>
                <div className="Header-item">
                    <Link to='/login'>Logout</Link>
                </div>
            </div>
        )
    }
}