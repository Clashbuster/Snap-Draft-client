
export default class Fetcher {

    static initialLogin(credentials){
        fetch('http://localhost:3000/api/v1/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                    user: credentials
                    })
                })
                .then(r => r.json())
                .then(data => {
                    console.log(data)
                    if (data.message !== "Invalid username or password"){
                    localStorage.setItem('user', data.user.username)
                    localStorage.setItem('user_id', data.user.id)
                    localStorage.setItem('token', data.jwt)
                    }
                })
    }

    static createUser(credentials){
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              user: credentials
            })
          })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                if (data.error !== "failed to create user"){
                    localStorage.setItem('user', data.user.username)
                    localStorage.setItem('user_id', data.user.id)
                    localStorage.setItem('token', data.jwt)
                    }
            })
    }

    static getNovels(user, handler){
        fetch(`http://localhost:3000/api/v1/users/${user}/novels`, {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                handler(data)
            })
        }

    static checkLogin(id){
        if(localStorage.getItem('token') !== ""  && localStorage.getItem('user_id') === id){
            return true
        } else {
            return false
        }
    }

    static logout(){
        localStorage.clear()
    }
   
}
