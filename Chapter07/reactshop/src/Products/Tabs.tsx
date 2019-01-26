import React, { useState, useEffect } from "react";

// interface IProps {
//   headings: string[];
// }
interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}

interface ITabProps {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
}

interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

const TabsContext = React.createContext<ITabsContext>({});

class Tabs extends React.Component<{}, IState> {
  public static Tab: React.FC<ITabProps> = props => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
            return null;
          }
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.heading()}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );

  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: content });
  };
}

// const TabsFC: React.FC<IProps> = props => {
//   const initialActiveHeading: string =
//     props.headings && props.headings.length > 0 ? props.headings[0] : "";
//   const [activeHeading, setActiveHeading] = useState(initialActiveHeading);

//   const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
//     const li = e.target as HTMLLIElement;
//     const heading: string = li.textContent ? li.textContent : "";
//     setActiveHeading(heading);
//   };

//   return (
//     <ul className="tabs">
//       {props.headings.map(heading => (
//         <li
//           onClick={handleTabClick}
//           className={heading === activeHeading ? "active" : ""}
//         >
//           {heading}
//         </li>
//       ))}
//     </ul>
//   );
// };

export default Tabs;
