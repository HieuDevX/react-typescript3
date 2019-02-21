import React, { Component, FunctionComponent } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Header } from "./Header";
import RepoSearch from "./RepoSearch";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: "Bearer 50d07908c79376331e19b43fb9ef63afd8bc84e1"
  }
});

import "./App.css";

const App: FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <RepoSearch client={client} />
      </div>
    </ApolloProvider>
  );
};

export default App;
