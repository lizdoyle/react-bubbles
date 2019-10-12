import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./PrivateRoute";
import "./styles.scss";

const App = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then(res => setColorList(res.data))
      .catch(err => console.log("App.js:", err))


  }, [])
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login}/>
        <PrivateRoute 
        path="/colors" 
        component={BubblePage} 
        render={props => (
          <BubblePage {...props} colorList={colorList} />
        )} />
               {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
          
        */}
      </div>
    </Router>
  );
}

export default App;
