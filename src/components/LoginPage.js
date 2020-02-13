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
    password: '',
    checkpassword: '',
    error: "",
    newUser: false
}

export default class LoginPage extends React.Component {
constructor(){
    super()
    this.state = INITIAL_STATE
}


    signup(e){
        e.preventDefault()
        if(this.state.password === this.state.checkpassword){
          Fetcher.createUser(this.state, this.loginStateChanger, this.errorhandler)

        } else {
          this.setState({
            error: "Passwords do not match"
          })
        }
    }

  loginStateChanger = (error) => {
    this.setState({
      username: "",
      password: "",
      login: true
  }, () => {
    this.props.changePageState('Dash')
  })
  }

  errorhandler = (error) => {
    this.setState({
      error: error
    })
  }

  
  login(e){
    e.preventDefault()
    Fetcher.initialLogin(this.state, this.loginStateChanger, this.errorhandler)
  }

  handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
  }

  renderError(){
    return (
                <div className="flash">
                <svg width="16" height="16" viewBox="0 0 16 16" className="octicon octicon-alert mr-2" aria-hidden="true">
                    <path
                    fillRule="evenodd"
                    d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
                    />
                </svg>
                {this.state.error}
                </div>
    )
}

handleNewUserChange(e){
  e.preventDefault()
  this.setState(prev => {
    let answer = !prev.newUser
    return {
      newUser: answer
    }
  })
}

displayLoginLink(){
  if(this.state.newUser === true){
    return "Already a member"
  } else {
    return "New user"
  }
}

displayCredentialsForm(){
  if(this.state.newUser === true){
    return (
      <>
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
        <dl className="form-group">
            <dt><label htmlFor="example-textarea">Confirm Password</label></dt>
            <dd>
            <input onChange={e => this.handleChange(e)} className="form-control" type="password" name='checkpassword' placeholder='Confirm Password' value={this.state.checkpassword} aria-label="Default input"></input>
            </dd>
        </dl>
        </form>
              <div className="Box-footer border-top-0">
            <Button onClick={e => this.signup(e)}>Sign up</Button>
          </div>
      </>
    )
  } else {
    return (
      <>
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
      <div className="Box-footer border-top-0">
      <Button onClick={e => this.login(e)}>Log in</Button>
      </div>
    </>
    )
  }
}



  componentDidUpdate(){
      console.log(this.state)
  }

  

    render(){
      if(this.state.login) {
        return <Redirect to={`/users/${localStorage.getItem('user')}/dashboard`}></Redirect>
      }
        return (

                <div className=" d-flex flex-column m-5" >
                <div className="pagehead">
                    <h1>Snap Draft</h1>
                </div>

                <div className="Subhead">
                    <div className="Subhead-heading border-bottom-0 d-flex">The world's greatest novel drafting platform</div>
                <div className="Subhead-actions"><a onClick={e => this.handleNewUserChange(e)} href="#url">{this.displayLoginLink()}</a></div>
                </div>
                      

                       
                      
                    {this.displayCredentialsForm()}
                    {this.state.error? this.renderError() : ""}
                </div>
           
        )
    }
}