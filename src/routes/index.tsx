import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import { Button } from "@material-ui/core";
import AuthContext from "../context/auth/AuthContext";
import NotFound from "../screen/NotFound";
import Header from "../component/Header";
import routes from "./routes";

export default function Routes() {
  const { userToken, homePath } = useContext(AuthContext);
  return (
    <Router>
      <Header>
        {userToken !== null ? (
          <Button
            color="inherit"
            component={NavLink}
            exact
            to={homePath}
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            Inicio
          </Button>
        ) : (
          ""
        )}
        {routes.map((route, i) => {
          return (
            <div key={i}>
              {route.show ? (
                userToken === null ? (
                  <Button
                    color="inherit"
                    component={NavLink}
                    exact
                    to={route.path}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {route.displayName}
                  </Button>
                ) : (
                  ""
                )
              ) : userToken !== null ? (
                !route.shadow ? (
                  <Button
                    color="inherit"
                    component={NavLink}
                    exact
                    to={route.path}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {route.displayName}
                  </Button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          );
        })}
      </Header>
      <Switch>
        {routes.map((route, i) => {
          return <PrivateRoute path={route.path} route={route} key={i} exact />;
        })}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, route, ...rest }) {
  const { accessRoute } = useContext(AuthContext);
  const valid = accessRoute(route);

  return (
    <div>
      {valid && (
        <Route {...rest}>
          <route.component />
        </Route>
      )}
      {!valid && (
        <Route {...rest}>
          {({ location }) => (
            <div className="page">
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            </div>
          )}
        </Route>
      )}
    </div>
  );
}
