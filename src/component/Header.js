import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Slide,
  Toolbar,
  useScrollTrigger,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AuthContext from "../context/auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <>
      {props.position === "static" ? (
        children
      ) : (
        <Slide appear={false} direction="down" in={trigger}>
          {children}
        </Slide>
      )}
    </>
  );
};
export default function Header(props) {
  const classes = useStyles();
  const { userToken, homePath } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>
      {pathname === "/login" || pathname === "/register" ? (
        ""
      ) : (
        <HideOnScroll
          {...props}
          position={
            userToken !== null
              ? pathname === homePath
                ? "static"
                : null
              : null
          }
        >
          <AppBar
            position={
              userToken !== null
                ? pathname === homePath
                  ? "static"
                  : "fixed"
                : "fixed"
            }
            style={{ background: pathname === "/" ? "" : "" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Nerby Business
              </Typography>
              {props.children}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      )}
    </div>
  );
}
