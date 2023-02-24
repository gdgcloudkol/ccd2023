import axios from "axios";

const BASE_AUTH_URI = 'https://api.gdgcloud.kolkata.dev/auth'

export function ApiLogin(username: string, password: string, setLoggedInState: any) {

  axios.post(BASE_AUTH_URI + '/login/',
    { username, password }
  )
    .then(data => {
      console.log(data)
      setLoggedInState(true);
      localStorage.setItem('loggedIn', 'true');
    })
    .catch(e => console.log(e))
}

export function ApiSignup() {
  axios.post(BASE_AUTH_URI + '/registration/',
    //
  )
    .then(data => {
      console.log(data)
      localStorage.setItem('loggedIn', 'true');
    })
    .catch(e => console.log(e))
}

export function ApiLogout(setLoggedInState: any, navigate: any) {
  localStorage.removeItem('loggedIn');
  setLoggedInState(false)
  navigate('/home')
}