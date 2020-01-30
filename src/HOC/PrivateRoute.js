
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";
import Fetcher from './Fetcher';



const PrivateRoute = ({component: Component, ...rest}) => {


console.log(rest)



return <Route {...rest} render={props => (Fetcher.checkLogin(rest.computedMatch.params.id)? <Component {...props} {...rest} ></Component> : <Redirect to='/login'></Redirect>)} />

}


export default PrivateRoute;