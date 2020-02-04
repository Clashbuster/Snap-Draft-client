import React from 'react';
import {Button, Box, Heading} from '@primer/components'
import Fetcher from '../HOC/Fetcher.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

const INITIAL_STATE = {
    username: '',
    password: ''
}

export default class LoginPage extends React.Component {
constructor(){
    super()
    this.state = INITIAL_STATE
}

    signup(e){
        e.preventDefault()
        Fetcher.createUser(this.state, this.loginStateChanger)
    }

  loginStateChanger = () => {
    this.setState({
      username: "",
      password: "",
      login: true
  }, () => {
    this.props.changePageState('Dash')
  })
  }

  
  login(e){
    e.preventDefault()
    Fetcher.initialLogin(this.state, this.loginStateChanger)
  
  }

  handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
  }

  componentDidUpdate(){
      console.log(this.state)
  }

  

    render(){
      if(this.state.login) {
        return <Redirect to={`/users/${localStorage.getItem('user_id')}/dashboard`}></Redirect>
      }
        return (

                <div className=" d-flex flex-column m-5" >
                  <div className="Box">
                      <div className="Box-header">
                          <h1 className="Box-title">
                            Welcome to Snap Draft

                          </h1>
                      </div>
                      <div className="Box-body border-bottom-0">
                      <form>
                          <dl className="form-group">
                              <dt><label htmlFor="example-text">Username</label></dt>
                              <input onChange={e => this.handleChange(e)} className="form-control" type="text" name='username' placeholder='Username' value={this.state.username} aria-label="Default input"></input>

                          </dl>

                          <dl className="form-group">
                              <dt><label htmlFor="example-textarea">Password</label></dt>
                              <dd>
                              <input onChange={e => this.handleChange(e)} className="form-control" type="password" name='password' placeholder='Password' value={this.state.password} aria-label="Default input"></input>
                              </dd>
                          </dl>
                          </form>
                      </div>
                      <div className="Box-footer border-top-0">
                      <Button onClick={e => this.login(e)}>Log in</Button>
                      <Button onClick={e => this.signup(e)}>New User</Button>
                      </div>
                    </div>
                </div>
           
        )
    }
}