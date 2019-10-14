import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({username: "", password: ""});

  const loginChangeHandler = e => {
    e.preventDefault();
      setCredentials({...credentials, [e.target.name]: e.target.value
      });
    };

    const routeColors = () => {
      props.history.push("/bubbles")
    }

    const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
        .post("/login", credentials)
        .then(res => {
          localStorage.setItem("token", res.data.payload)
          routeColors()
        })
        .catch(err => console.log(err))
    }

//   const loggedIn = e => {
//         e.preventDefault();
//         axiosWithAuth()
//         .post("/login, credentials")
//         .then(res => {
//           console.log(res.data)

//           localStorage.setItem('token', res.data.payload);
//           props.history.push('/bubbles');
//       })
//       .catch(err => console.log(err))
// }

 


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form className="loginForm">
            <label htmlFor="userName"> Username</label>
            <input
                type="text"
                name="username"
                placeholder="UserName"
                value={credentials.username}
                onChange={loginChangeHandler}
            />

            <label htmlFor="password"> Password</label>
            <input
                type="text"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={loginChangeHandler}
            />

            <button onClick={handleSubmit}>Login</button>

        </form>
    </div>
  );
};

export default Login;
