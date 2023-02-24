import axios from "axios";

const BASE_AUTH_URI = 'https://api.gdgcloud.kolkata.dev/auth'

export function postTestLogin(username: string, password: string) {
  axios.post(BASE_AUTH_URI + '/login',
    { username, password }
  )
    .then(data => {
      console.log(data)
      localStorage.setItem('loggedIn', 'true');
    })
    .catch(e => console.log(e))
}

export function postTestSignup({ }) {
  axios.post(BASE_AUTH_URI + '/registration',
    //
  )
    .then(data => {
      console.log(data)
      localStorage.setItem('loggedIn', 'true');
    })
    .catch(e => console.log(e))
}

export function logout() {
  localStorage.removeItem('loggedIn');
}