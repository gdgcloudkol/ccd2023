import axios from "axios";
import { useNavigate } from "react-router-dom";

export function postTestLogin(username: string, password: string) {
  axios.post('https://api.gdgcloud.kolkata.dev/auth/login/',
    { username, password }
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