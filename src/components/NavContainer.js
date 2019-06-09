import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";
const auth = new Auth();

const NavContainer = ({ isSignedIn, token }) => {
  const [nav, setNav] = useState([]);
  useEffect(() => {
    if (isSignedIn) {
      setNav([
        { route: "/dashboard", label: "Home" },
        { route: "/projects", label: "Projects" },
        { route: "/profile/developer", label: "Developer" },
        { route: "/profile", label: "Profile" },
        { route: "/home", label: "Logout", callback: () => auth.logout() }
      ]);
    } else {
      setNav([
        { route: "/home", label: "Home" },
        { route: "/projects", label: "Projects" },
        { route: "/profile/developer", label: "Developer" },
        {
          route: token ? "/signup" : "/login",
          label: "Login",
          callback: !token ? () => auth.login() : null
        },
        {
          route: "/signup",
          label: "Signup",
          callback: !token ? () => auth.login() : null
        }
      ]);
    }
  }, [isSignedIn, token]);
  return (
    <nav>
      <div className={"logo"}>Logo</div>
      <ul>
        {nav.map(link => {
          return (
            <li key={link.label}>
              <Link
                onClick={link.callback ? link.callback : null}
                to={link.route}
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
