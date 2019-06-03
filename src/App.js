import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import User from "./components/User";
import "./App.css";

const useGapi = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [auth, setAuth] = useState(null);

  const onAuthChange = auth => {
    return () => setIsSignedIn(auth.isSignedIn.get());
  };

  const test = auth => {
    return () => auth;
  };

  let gg;

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          client_id:
            "177270465698-tbnm6os1224qjrkdrhvkrnqrhgftfu96.apps.googleusercontent.com",
          scope: "profile"
        })
        .then(async () => {
          const auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth)();
          setAuth(auth);
          auth.isSignedIn.listen(onAuthChange(auth));
          gg = test(auth);
        })
        .then(() => {
          const auth = gg();
          const token = auth.currentUser.get().getAuthResponse(true).id_token;
          axios
            .get(`http://localhost:8000/api/account/admin/test-admin`, {
              headers: {
                Authorization: token
              }
            })
            .then(res => {
              console.log(res, "res");
            })
            .catch(err => console.log(err));
        });
    });
  }, []);

  const signIn = auth => {
    return () => auth.signIn();
  };

  const signOut = auth => {
    return () => {
      console.log(auth);
      auth.signOut();
    };
  };

  console.log(auth, "return");
  return [{ isSignedIn }, { onSignOut: signOut(auth), onSignIn: signIn(auth) }];
};

const App = () => {
  const [{ isSignedIn }, { onSignOut, onSignIn, auth }] = useGapi();
  if (isSignedIn === null) {
    return null;
  } else if (isSignedIn) {
    return (
      <button onClick={() => onSignOut(auth)} className="ui red google button">
        <i className="google icon" />
        Sign out
      </button>
    );
  } else {
    return (
      <button onClick={() => onSignIn(auth)} className="ui red google button">
        <i className="google icon" />
        Sign in with google
      </button>
    );
  }
  // return (
  //   <div className="App">
  //     <User />
  //   </div>
  // );
};

export default App;
