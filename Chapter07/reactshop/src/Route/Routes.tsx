import * as React from "react";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import {
  CSSTransition,
  Transition,
  TransitionGroup
} from "react-transition-group";

// import AdminPage from "../Admin/AdminPage";
import ProductsPage from "../Products/ProductsPage";
import ProductPage from "../Products/ProductPage";
import NotFoundPage from "../NotFoundPage";
import Header from "../Header/Header";
import LoginPage from "../Admin/LoginPage";
import ContactUsPage from "../Contact/ContactUsPage";

const AdminPage = React.lazy(() => import("../Admin/AdminPage"));

const Routes: React.FC<RouteComponentProps> = props => {
  const [loggedIn, setLoggedIn] = React.useState(true);
  // const [loggedIn, setLoggedIn] = React.useState(false);

  // React.useEffect(() => {
  //   console.log("Confirm first rendering");
  //   console.log("Wait 5 secs for loggin in ...");
  //   setTimeout(() => {
  //     const newLoggedIn = true;
  //     setLoggedIn(newLoggedIn);
  //     console.log("Log in successfully! Now U can access Admin");
  //   }, 5000);
  // }, []);

  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={500}
          classNames="animate"
        >
          <Switch>
            <Redirect exact={true} path="/" to="/products" />
            <Route exact={true} path="/products" component={ProductsPage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/contactus" component={ContactUsPage} />

            <Route path="/admin">
              {loggedIn ? (
                <Suspense
                  fallback={<div className="page-container">Loading...</div>}
                >
                  <AdminPage />
                </Suspense>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const RoutesWrap: React.FC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

// export default Routes;
export default RoutesWrap;
