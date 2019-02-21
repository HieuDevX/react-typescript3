import React, { FunctionComponent, useState } from "react";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-boost";
import { Mutation } from "react-apollo";

interface IProps {
  client: ApolloClient<any>;
}

interface ISearch {
  orgName: string;
  repoName: string;
}

interface IRepo {
  id: string;
  name: string;
  description: string;
  viewerHasStarred: boolean;
  stargazers: {
    totalCount: number;
  };
  issues: {
    edges: [
      {
        node: {
          id: string;
          title: string;
          url: string;
        };
      }
    ];
  };
}

const defaultRepo: IRepo = {
  id: "",
  name: "",
  description: "",
  viewerHasStarred: false,
  stargazers: {
    totalCount: 0
  },
  issues: {
    edges: [
      {
        node: {
          id: "",
          title: "",
          url: ""
        }
      }
    ]
  }
};

interface IQueryResult {
  repository: IRepo;
}

const GET_REPO = gql`
  query GetRepo($orgName: String!, $repoName: String!) {
    repository(owner: $orgName, name: $repoName) {
      id
      name
      description
      viewerHasStarred
      stargazers {
        totalCount
      }
      issues(last: 5) {
        edges {
          node {
            id
            title
            url
            publishedAt
          }
        }
      }
    }
  }
`;

const STAR_REPO = gql`
  mutation($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;

const RepoSearch: FunctionComponent<IProps> = props => {
  const [search, setSearch]: [ISearch, (search: ISearch) => void] = useState({
    orgName: "",
    repoName: ""
  });

  const [repo, setRepo]: [IRepo, (repo: IRepo) => void] = useState(defaultRepo);

  const [searchError, setSearchError]: [
    string,
    (searchError: string) => void
  ] = useState("");

  const handleOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, orgName: event.currentTarget.value });
  };

  const handleRepoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, repoName: event.currentTarget.value });
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchError("");
    setRepo(defaultRepo);

    props.client
      .query<IQueryResult>({
        query: GET_REPO,
        variables: {
          orgName: search.orgName,
          repoName: search.repoName
        }
      })
      .then(response => {
        setRepo(response.data.repository);
      })
      .catch(error => {
        setSearchError(error.message);
      });
    // TODO - make GraphQL query
  };

  return (
    <div className="repo-search">
      <form onSubmit={handleSearch}>
        <label>Organization</label>
        <input
          type="text"
          onChange={handleOrgNameChange}
          value={search.orgName}
        />
        <label>Repository</label>
        <input
          type="text"
          onChange={handleRepoNameChange}
          value={search.repoName}
        />
        <button type="submit">Search</button>
      </form>

      {repo.id && (
        <div className="repo-item">
          <h4>
            {repo.name}
            {repo.stargazers ? `${repo.stargazers.totalCount}` : ""}
          </h4>
          <p>{repo.description}</p>
          <div>
            {!repo.viewerHasStarred && (
              <Mutation
                mutation={STAR_REPO}
                variables={{ repoId: repo.id }}
                // clear cache
                // refetchQueries={[
                //   {
                //     query: GET_REPO,
                //     variables: {
                //       orgName: search.orgName,
                //       repoName: search.repoName
                //     }
                //   }
                // ]}

                // update cache
                update={cache => {
                  const data: { repository: IRepo } | null = cache.readQuery({
                    query: GET_REPO,
                    variables: {
                      orgName: search.orgName,
                      repoName: search.repoName
                    }
                  });
                  if (data === null) {
                    return;
                  }

                  const newData = {
                    ...data.repository,
                    viewerHasStarred: true,
                    stargazers: {
                      ...data.repository.stargazers,
                      totalCount: data.repository.stargazers.totalCount + 1
                    }
                  };

                  cache.writeQuery({
                    query: GET_REPO,
                    variables: {
                      orgName: search.orgName,
                      repoName: search.repoName
                    },
                    data: { repository: newData }
                  });

                  setRepo(newData);
                }}
              >
                {(addStar, { loading, error }) => (
                  <div>
                    <button disabled={loading} onClick={() => addStar()}>
                      {loading ? "Adding ..." : "Start!"}
                    </button>
                    {error && <div>{error.toString()}</div>}
                  </div>
                )}
              </Mutation>
            )}
          </div>
          <div>
            Last 5 issues:
            {repo.issues && repo.issues.edges ? (
              <ul>
                {repo.issues.edges.map(item => (
                  <li key={item.node.id}>{item.node.title}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      )}
      {searchError && <div className="search-error">{searchError}</div>}
    </div>
  );
};

export default RepoSearch;
