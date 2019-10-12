import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({});

  const loggedIn = e => {
        e.preventDefault();
        axiosWithAuth.post("/login, credentials")
        .then(res => {
          console.log(res.data)

          localStorage.setItem('token', res.data.token);
          props.history.location.push('/');
      })
      .catch(err => console.log(err))
}

  const loginChangeHandler = e => {

  setCredentials({
    ...credentials,
    [e.target.name]: e.target.value 
    });
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={loggedIn} className="loginForm">
            <label htmlFor="userName"> Username</label>
            <input
                type="text"
                name="userName"
                placeholder="UserName"
                value={credentials.userName}
                onChange={loginChangeHandler}
            />

            <label htmlFor="password"> Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={loginChangeHandler}
            />

            <button type="submit">Login</button>

        </form>
    </div>
  );
};

export default Login;
