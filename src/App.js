import React, { useState, useEffect, useReducer } from "react";
import { reducer, initialState } from "./store/reducer.js";
import axios from "axios";
import User from "./components/User";
import "./App.css";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <div className="App">
      {/* <User /> */}
      <Dashboard user={state.user} dispatch={dispatch} />
      hello world
    </div>
  );
};

export default App;
