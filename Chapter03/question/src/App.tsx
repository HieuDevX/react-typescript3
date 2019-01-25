import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./Button";
import Counter from "./Counter";

interface IState {
  doItVisible: boolean;
  doItDisable: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      doItVisible: true,
      doItDisable: false
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chapter 3: Question
          </a>
        </header>
        {/* <Button buttonLabel="Hello friend" /> */}
        {this.state.doItVisible && (
          <Button
            onClick={this.handleOnClick}
            disabled={this.state.doItDisable}
          />
        )}
        <Counter />
      </div>
    );
  }

  private handleOnClick = () => {
    this.setState({
      doItDisable: true
    });
    console.log("Clicked");
  };
}

export default App;
