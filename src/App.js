import React, { useState, useEffect, useReducer } from "react";
import { reducer, initialState } from "./store/reducer.js";
import axios from "axios";
import User from "./components/User";

import Auth from "./components/Auth/Auth";
import { Route, Link } from "react-router-dom";

// import Auth from "./components/Auth/Auth";

import "./App.css";
import Dashboard from "./components/Dashboard";
import Callback from "./components/Auth/Callback";
// import Authenticated from "./components/Auth/Authenticated";
// const auth = new Auth();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      {/* <User /> */}

      <Link to="/login">
        <button>Login Here</button>
      </Link>


      <Route
        path={"/dashboard"}
        render={props => (
          <Dashboard
            {...props}
            user={state.user}
            dispatch={dispatch}
            role={state.role}
          />
        )}
      />
      {/* <Dashboard user={state.user} dispatch={dispatch} role={state.role} /> */}
      hello world
      {/* <button onClick={() => auth.login()}>Login Here</button>

      <button onClick={() => auth.logout()}>Log Out Here</button>
      <Route
        exact
        path="/login"
        render={() => {
          auth.login();
        }}
      />
      <Route exact path="/callback" component={Callback} />
      <Route path="/authenticated" component={Authenticated} /> */}
      <Route path={"/home"} render={() => <div>Home</div>} />
    </div>
  );
};

export default App;
