import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Route/Routes";

import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore from "./Redux-Store/Store";
import { IApplicationState } from "./Redux-Store/Store";

interface IProps {
  store: Store<IApplicationState>;
}

const Root: React.FC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById(
  "root"
) as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
