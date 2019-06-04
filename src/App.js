import React from "react";
import User from "./components/User";
import Auth from "./components/Auth/Auth";
import { Route } from "react-router";
import "./App.css";
import Callback from "./components/Auth/Callback";
import Authenticated from "./components/Auth/Authenticated";

const auth = new Auth();

function App() {
  return (
    <div className="App">
      {/* <User /> */}
      <button onClick={() => auth.login()}>Login Here</button>
      <button onClick={() => auth.logout()}>Log Out Here</button>
      <Route exact path="/callback" component={Callback} />
      <Route path="/authenticated" component={Authenticated} />
    </div>
  );
}

export default App;
