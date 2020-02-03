import React from 'react';
import './App.css';
// import React from 'react.js';
import LoginPage from '../src/components/LoginPage.js'
import DashBoard from '../src/components/DashBoard.js'
import DocShow from '../src/components/DocShow.js'
import NavBar from '../src/components/NavBar.js'
import Sprint from '../src/components/Sprint.js'
import Stats from '../src/components/Stats.js'
import MissionStatement from '../src/components/MissionStatement.js'
import {Button, Box, Heading} from '@primer/components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
import Fetcher from './HOC/Fetcher.js'
import PrivateRoute from './HOC/PrivateRoute.js'


class App extends React.Component {





render (){
    return (
      <div className="App">
        <Router>
          <NavBar></NavBar>
              <Switch>
                <Route path="/login" render={() => <LoginPage></LoginPage>}>
                </Route>

                <Route path="/mission-statement" render={(props) => <MissionStatement {...props} ></MissionStatement>}>
                </Route>

                <PrivateRoute  path="/users/:id/dashboard" component={DashBoard}></PrivateRoute>
              </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
