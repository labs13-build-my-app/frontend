import React from "react";
import User from "./components/User";
import Auth from "./components/Auth/Auth";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Callback from "./components/Auth/Callback";
import Authenticated from "./components/Auth/Authenticated";

const auth = new Auth();

function App() {
  return (
    <div className="App">
      {/* <User /> */}
      <Link to="/login">
        <button>Login Here</button>
      </Link>

      <button onClick={() => auth.logout()}>Log Out Here</button>
      <Route
        exact
        path="/login"
        render={() => {
          auth.login();
        }}
      />
      <Route exact path="/callback" component={Callback} />
      <Route path="/authenticated" component={Authenticated} />
    </div>
  );
}

export default App;
