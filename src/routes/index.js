import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthContext, { AuthRoles } from "../context/auth/AuthContext";
import Home from "../screen/Home";
import Dashboard from "../screen/dashboard/Index";
import NotFound from "../screen/NotFound";
import auth from "./auth";

const routes = [
  {
    path: "/",
    component: Home,
  },
  ...auth,
  {
    path: "/dashboard",
    component: Dashboard,
    permission: AuthRoles.EMPRESARIO,
  },
  {
    path: "/productos",
    component: ProtectedPage,
    permission: AuthRoles.NORMAL,
  },
];
export default function Routes() {
  return (
    <Router>
      {/*Header*/}

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

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function PrivateRoute({ children, route, ...rest }) {
  const { accessRoute } = useContext(AuthContext);
  const valid = accessRoute(route);

  return (
    <>
      {valid && (
        <Route
          {...rest}
          render={(props) => {
            return <>{<route.component />}</>;
          }}
        />
      )}
      {!valid && (
        <Route
          {...rest}
          render={({ location }) => {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            );
          }}
        />
      )}
    </>
  );
}
