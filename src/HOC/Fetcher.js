
export default class Fetcher {

    static initialLogin(credentials, handler){
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
                    handler()
                    
                    }
                })
    }

    static createUser(credentials, handler){
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
                    handler()
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
        if(localStorage.getItem('token') !== null){
            if(localStorage.getItem('user_id') === id){
                    return true
                }else {
                return false
            }
        } else {
            return false
        }
    }

    static logout(){
        localStorage.clear()
    }

    static submitSprint(user, novel, text, chapterName = "", handler){
        fetch(`http://localhost:3000/api/v1/users/${user}/submit-sprint`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                user: user,
                novel: novel,
                chapter: chapterName,
                text : text
            })
          })
            .then(r => r.json())
            .then(data => {
                handler(data)

            })
    }

    static getChapters(user, novel, handler){
        fetch(`http://localhost:3000/api/v1/users/${user}/${novel}`, {
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


    static postNewNovel(user, novelObj, handler){
        fetch(`http://localhost:3000/api/v1/users/${user}/submit-novel`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(novelObj)
          })
            .then(r => r.json())
            .then(data => {
                handler(data)

            })
    }


    static deleteNovel(user, novel, handler){
        fetch(`http://localhost:3000/api/v1/users/${user}/${novel}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                console.log(data, "deletion from backend")
                handler()
            })
    }


   
}
