import React from 'react';
import './App.css';
// import React from 'react.js';

let example = ''

class App extends React.Component {

signup (e){
  e.preventDefault()
  fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: 'guy215',
        password: 'hi'
      }
    })
  })
    .then(r => r.json())
    .then(data => {
      console.log(data)
    })
}

login(e){
  e.preventDefault()
  fetch('http://localhost:3000/api/v1/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
      Accept: 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: 'guy215',
      password: 'hi'
    }
  })
})
  .then(r => r.json())
    .then(console.log)
}



render (){
    return (
      <div className="App">
        <button onClick={e => this.signup(e)}>make new user with salt</button>
        <button onClick={e => this.login(e)}>login with jwt</button>
      </div>
    );
  }
}

export default App;
