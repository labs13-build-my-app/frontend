import React, { useEffect } from "react";
import Auth from "./Auth";

const Callback = props => {
  const auth = new Auth();
  useEffect(() => {
    const random = async () => {
      try {
        await auth.handleAuthentication();
        props.history.push("/authenticated");
        console.log(localStorage.getItem("token"));
      } catch (err) {
        console.log(err);
      }
    };
    random();
  }, [auth, props.history]);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
