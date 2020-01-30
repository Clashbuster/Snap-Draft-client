import React from 'react';
import {Button, Box, Heading} from '@primer/components'
import Fetcher from '../HOC/Fetcher.js'

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
        Fetcher.createUser(this.state)
        this.setState({
            username: "",
            password: ""
        })
    }

  
  login(e){
    e.preventDefault()
    Fetcher.initialLogin(this.state)
    this.setState({
        username: "",
        password: ""
    })
  }

  handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
  }

  componentDidUpdate(){
      console.log(this.state)
  }
  
  checkFetch(e){
  e.preventDefault()
  fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem('user')}/novels`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
        Accept: 'application/json'
    }
  })
    .then(r => r.json())
      .then(console.log)
  }


  checkLocalStorage(){
    console.log(localStorage.getItem('user_id'))
  }
  

    render(){
        return (
            <div>
                <form>
                <input onChange={e => this.handleChange(e)} className="form-control" type="text" name='username' placeholder='Username' value={this.state.username} aria-label="Default input"></input>
                <input onChange={e => this.handleChange(e)} className="form-control" type="password" name='password' placeholder='Password' value={this.state.password} aria-label="Default input"></input>
                <Button onClick={e => this.login(e)}>login with jwt</Button>
                </form>
                <Button onClick={e => this.signup(e)}>make new user with salt</Button>
                <Button onClick={e => this.checkFetch(e)}>check get request with jwt</Button>
                <Button onClick={e => this.checkLocalStorage(e)}>checkLocalStorage</Button>
                <Button onClick={e => Fetcher.logout()}>logout</Button>
            </div>
        )
    }
}