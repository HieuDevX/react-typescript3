import React, { FunctionComponent, useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
// import axios from "axios";

interface IViewer {
  name: string;
  avatarUrl: string;
}

interface IQueryResult {
  // data: {
  viewer: IViewer;
  // };
}

const GET_VIEWER = gql`
  {
    viewer {
      name
      avatarUrl
    }
  }
`;

class GetViewerQuery extends Query<IQueryResult> {}

export const Header: FunctionComponent = () => {
  // const [viewer, setViewer]: [IViewer, (viewer: IViewer) => void] = useState({
  //   name: "",
  //   avatarUrl: ""
  // });

  // useEffect(() => {
  //   // TODO - make a GraphQL query
  //   axios
  //     .post<IQueryResult>(
  //       "https://api.github.com/graphql",
  //       {
  //         query: `query {
  //           viewer {
  //             name
  //             avatarUrl
  //           }
  //         }`
  //       },
  //       {
  //         headers: {
  //           Authorization: "bearer 50d07908c79376331e19b43fb9ef63afd8bc84e1"
  //         }
  //       }
  //     )
  //     .then(response => {
  //       setViewer(response.data.data.viewer);
  //     });
  // }, []);
  return (
    <GetViewerQuery query={GET_VIEWER}>
      {({ data, loading, error }) => {
        if (error) {
          return <div className="viewer">{error.toString()}</div>;
        }
        if (loading) {
          return <div className="viewer">Loading ...</div>;
        }
        if (!data || !data.viewer) {
          return null;
        }
        return (
          <div>
            <img src={data.viewer.avatarUrl} className="avatar" />
            <div>{data.viewer.name}</div>
            <h1>GitHub Search</h1>
          </div>
        );
      }}
    </GetViewerQuery>
  );
};
