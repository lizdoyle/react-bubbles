import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./PrivateRoute";
import "./styles.scss";

const App = () => {
  
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login}/>
        <PrivateRoute  exact  path="/bubbles"  component={BubblePage} />
       
               {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
          
        */}
      </div>
    </Router>
  );
}

export default App;
