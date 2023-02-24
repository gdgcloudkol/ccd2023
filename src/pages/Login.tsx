import { useContext, useState } from "react";
import { ApiLogin } from "../services/rest.service";
import { LoggedInContext } from "../services/state.service";

const Login = () => {
  const { setLoggedInState } = useContext(LoggedInContext)
  const [user] = useState({ username: '', password: '' });
  const { username, password } = user;

  function handleChange(e: any) {
    const { name, value } = e.target;
    if (name === 'username')
      user.username += value
    else
      user.password += value
  }

  function handleSubmit() {
    ApiLogin(user.username, user.password, setLoggedInState)
  }

  return (
    <div className="bg-white">
      <label>
        Username:
        <input type="text" value={username} name="username" onChange={handleChange} />
        Password:
        <input type="password" value={password} name="password" onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login
