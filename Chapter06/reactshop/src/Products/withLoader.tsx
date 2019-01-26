import * as React from "react";

interface IProps {
  loading: boolean;
}

// const withLoader = <P extends object>(
//   Component: React.ComponentType<P>
//   // Component: any
// ): React.FC<P & IProps> => ({ loading, ...props }: IProps) =>
//   loading ? (
//     <div className="loader-overlay">
//       <div className="loader-circle-wrap">
//         <div className="loader-circle" />
//       </div>
//     </div>
//   ) : (
//     <Component {...props} />
//   );

const withLoader = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & IProps> => ({ loading, ...props }: IProps) =>
  loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (
    // "as any" fix bug "Type error: Type '{}' is not assignable to type 'P'"
    // (because of typescript 3.2 behaviour of the spread operator for generics has changed)
    <Component {...props as any} />
  );

// const withLoader = <P extends object>(Component: React.ComponentType<P>) =>
//   class WithLoader extends React.Component<P & IProps> {
//     public render() {
//       const { loading, ...props } = this.props as IProps;
//       return loading ? (
//         <div className="loader-overlay">
//           <div className="loader-circle-wrap">
//             <div className="loader-circle" />
//           </div>
//         </div>
//       ) : (
//         <Component {...props} />
//       );
//     }
//   };

export default withLoader;
