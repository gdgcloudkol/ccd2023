import { useState } from "react";
import { postTestLogin } from "../services/rest.service";

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const { username, password } = user;

  function handleChange(e: any) {
    const { name, value } = e.target;
    if (name === 'username')
      user.username += value
    else
      user.password += value
  }

  function handleSubmit() {
    postTestLogin(user.username, user.password)
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
