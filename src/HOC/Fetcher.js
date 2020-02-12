
const herokuURL = 'https://snapdraft.herokuapp.com/api/v1'


// const localURL =  'http://localhost:3000/api/v1'
// const herokuURL = localURL

export default class Fetcher {

    static initialLogin(credentials, handler, errorhandler){
        fetch(`${herokuURL}/login`, {
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
                    } else {
                        errorhandler(data.message)
                    }
                })
    }

    static createUser(credentials, handler, errorhandler){
        fetch(`${herokuURL}/users`, {
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
                    } else {
                        errorhandler(data.error)
                    }
            })
    }

    static getNovels(user, handler){
        fetch(`${herokuURL}/users/${user}/novels`, {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                handler(data)
            })
        }

    static checkLogin(username){
        if(localStorage.getItem('token') !== null){
            if(localStorage.getItem('user') === username){
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
        fetch(`${herokuURL}/users/${user}/submit-sprint`, {
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
        fetch(`${herokuURL}/users/${user}/${novel}`, {
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

    static getStats(user, novel, handler){
        fetch(`${herokuURL}/users/${user}/${novel}/stats`, {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                // console.log('hello from stats fetcher')
                handler(data)
            })
    }


    static postNewNovel(user, novelObj, handler){
        fetch(`${herokuURL}/users/${user}/submit-novel`, {
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
                // console.log(data)
                handler(data)

            })
    }

    static updateNovel(user, novelObj, handler){
        fetch(`${herokuURL}/users/${user}/update-novel`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(novelObj)
          })
            .then(r => r.json())
            .then(data => {
                // console.log(data)
                handler(data)

            })
    }




    static deleteNovel(user, novel, handler){
        fetch(`${herokuURL}/users/${user}/${novel}`, {
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
