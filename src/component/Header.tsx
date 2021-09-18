import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Slide,
  Toolbar,
  Box,
  Drawer,
  MenuItem,
  useScrollTrigger,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AuthContext from "../context/auth/AuthContext";
import { WithChildren } from "../@types/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  responsive: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
}));
type HiddenProps = { position: "static" | "fixed" | null };
const HideOnScroll = ({ children, ...props }: WithChildren<HiddenProps>) => {
  const trigger = useScrollTrigger();
  return (
    <div>
      {props.position === "static" ? (
        children
      ) : (
        <Slide
          appear={false}
          direction="down"
          in={trigger}
          children={children}
        />
      )}
    </div>
  );
};
export default function Header({ children, ...props }: WithChildren) {
  const classes = useStyles();
  const {
    UserData: { userToken, homePath },
  } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [drawer, setDrawerOpen] = React.useState(false);

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
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Nerby Business
              </Typography>
              <Box className={classes.responsive}>{children}</Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      )}
      <Drawer
        variant="temporary"
        open={drawer}
        onClose={() => setDrawerOpen(false)}
      >
        <MenuItem style={{ display: "block" }}>{children}</MenuItem>
      </Drawer>
    </div>
  );
}
