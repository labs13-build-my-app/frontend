import React, { useEffect, useState } from "react";
// import styled from 'styled-components';
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";
// const auth = new Auth();

const NavContainer = ({ isSignedIn, isToken, newUser, user, role }) => {
  const [nav, setNav] = useState([]);
  console.log("current state of new user", newUser);
  useEffect(() => {
    if (isToken) {
      setNav([
        { route: "/home", label: "Home" },
        { route: "/projects/proposals", label: "Projects" },
        {
          route: "/developers",
          label: "Developers"
        },
        {
          route: newUser ? "/signup" : `/profile/${user.id}`,
          label: "Profile",
          state: { id: user.id, role }
        },
        {
          route: "/",
          state: "logout",
          label: "Logout"
        }
      ]);
    } else {
      setNav([
        { route: "/home", label: "Home" },
        { route: "/projects/proposals", label: "Projects" },
        { route: "/developers", label: "Developers" },
        {
          route: isToken ? "/signup" : "/callback",
          label: "Login/Signup",
          state: "sign on"
        }
      ]);
    }
  }, [isSignedIn, isToken, newUser]);

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
