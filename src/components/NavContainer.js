import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    marginLeft: '5px',
    '&:hover': {
      color: '#4085FC',
      borderLeft: '5px solid #4085FC',
      marginLeft: 0,
    }
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
  selected: {
      color: '#4085FC',
      borderLeft: '5px solid #4085FC',
      marginLeft: 0,
  }
}));

const StyledLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  text-decoration: none;
`;

const auth = new Auth();

const NavContainer = ({ isSignedIn, token, newUser, user, role }) => {
  const [nav, setNav] = useState([]);
  const [active, setActive] = useState('Home');
  const [hovered, setHovered] = useState('');

  const classes = useStyles();

  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
    const navLinks = [
        { route: "/home", label: "Home", icon: 'fa fa-home' },
        { route: "/projects", label: "Projects", icon: 'fa fa-project-diagram' },
        { route: "/profile/developers", label: "Developers", icon: 'fa fa-address-book'}
    ];
    if (token) {
      navLinks.push(
        {
          route: newUser ? "/signup" : `/profile/${user.id}`,
          label: "Profile",
          state: { id: user.id, role },
          icon: 'fa fa-user'
        },
        {
          route: "/callback",
          state: "logout",
          label: "Logout",
          callback: () => auth.logout(),
          icon: 'fa fa-user-slash'
        }
      );
    } else {
      navLinks.push(
        {
          route: token ? "/signup" : "/callback",
          label: "Login/Signup",
          state: "sign on",
          callback: !token ? () => auth.login() : null,
          icon: 'fa fa-user'
        },
      );
    }
    setNav(navLinks);
  }, [isSignedIn, token, newUser]);

  return (
    <div style={{position: 'fixed', minHeight: '100vh', width: '20%', textAlign: 'left', backgroundImage: 'linear-gradient(to top right, #B1CAF8, #B1CAF8'}} className="nav-bar">
      <img
        src={require("../assets/images/logo.png")}
        style={{ width: "65%", height: "auto", margin: '45px auto 40px 75px' }}
      />
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          listStyleType: "none",
        }}
      >
        {nav.map(link => {
          return (
              <Link
                to={{ pathname: link.route, state: link.state }}
                className={classes.link}
              >
                <hr className={classes.indicator}/>
                <Icon className={clsx(classes.icon, link.icon)} style={{marginLeft: '40px'}}/>
                {link.label}
              </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavContainer;
