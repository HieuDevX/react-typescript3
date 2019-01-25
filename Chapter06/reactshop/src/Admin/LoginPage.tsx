import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

const LoginPage: React.FC<RouteComponentProps> = props => {
  // redirect to /admin after 5 seconds
  React.useEffect(() => {
    setTimeout(() => {
      props.history.push("/admin");
    }, 5000);
  }, []);
  return (
    <div className="page-container">
      <h1>Login</h1>
      <p>You need to login ...</p>
    </div>
  );
};

export default LoginPage;
