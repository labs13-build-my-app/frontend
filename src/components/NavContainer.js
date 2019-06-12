import React, { useEffect, useState } from "react";
// import styled from 'styled-components';
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";
const auth = new Auth();

const NavContainer = ({ isSignedIn, token, newUser }) => {
  const [nav, setNav] = useState([]);
  console.log(newUser);
  useEffect(() => {
    if (token) {
      setNav([
        { route: "/home", label: "Home" },
        { route: "/projects", label: "Projects" },
        { route: "/profile/developers", label: "Developers" },
        { route: newUser ? "/signup" : "/profile", label: "Profile" },
        {
          route: "/callback",
          state: "logout",
          label: "Logout",
          callback: () => auth.logout()
        }
      ]);
    } else {
      setNav([
        { route: "/home", label: "Home" },
        { route: "/projects", label: "Projects" },
        { route: "/profile/developers", label: "Developers" },
        {
          route: token ? "/signup" : "/callback",
          label: "Login",
          state: "sign on",
          callback: !token ? () => auth.login() : null
        },
        {
          route: "/signup",
          label: "Signup",
          state: "sign on",
          callback: !token ? () => auth.login() : null
        }
      ]);
    }
  }, [isSignedIn, token, newUser]);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
      }}
    >
      <img
        src={require("../assets/images/logo.png")}
        style={{ width: "25%", height: "auto", maxWidth: 385 }}
      />
      <ul
        style={{
          display: "flex",
          width: "70%",
          justifyContent: "space-around",
          listStyleType: "none"
        }}
      >
        {nav.map(link => {
          return (
            <li key={link.label}>
              <Link
                // onClick={link.callback ? link.callback : null}
                to={{ pathname: link.route, state: link.state }}
                style={{ textDecoration: "none", color: "grey" }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavContainer;
