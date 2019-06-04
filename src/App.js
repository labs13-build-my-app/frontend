import React, { useState, useEffect, useReducer } from "react";
import { reducer, initialState } from "./store/reducer.js";
import axios from "axios";
import User from "./components/User";
import Auth from "./components/Auth/Auth";
import { Route } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Callback from "./components/Auth/Callback";
import Authenticated from "./components/Auth/Authenticated";
const auth = new Auth();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("hello");
  return (
    <div className="App">
      {/* <User /> */}
      <Dashboard user={state.user} dispatch={dispatch} />
      hello world
      {/* <button onClick={() => auth.login()}>Login Here</button>
      <button onClick={() => auth.logout()}>Log Out Here</button>
      <Route exact path="/callback" component={Callback} />
      <Route path="/authenticated" component={Authenticated} /> */}
    </div>
  );
};

export default App;
