import React, { useEffect } from "react";
import Auth from "./Auth/Auth";

const home = ({ history }) => {
  //   useEffect(() => {});

  //   <Route exact path="/callback" component={Callback} />
  //   <Route path="/authenticated" component={Authenticated} />

  const signup = async e => {
    // e.preventDefault();
    // const auth = new Auth();
    // const route = await auth.login(history, "loading");
    // route();
    // // history.push("/loading");
  };

  const login = async e => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div>
      <button onClick={e => signup(e)}>signup Here</button>
      <button onClick={e => login(e)}>Login Here</button>
      {/* <button onClick={() => auth.logout()}>Log Out Here</button> */}
    </div>
  );
};
export default home;
