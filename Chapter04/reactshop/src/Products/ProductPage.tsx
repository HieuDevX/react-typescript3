import React, { useState, useEffect } from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { IProduct, products } from "./ProductsData";

// type Props = RouteComponentProps<{ id: string }>;

// interface IState {
//   product?: IProduct;
//   added: boolean;
// }

// class ProductPage extends React.Component<Props, IState> {
//   public constructor(props: Props) {
//     super(props);
//     this.state = {
//       added: false
//     };
//   }

//   public componentDidMount() {
//     if (this.props.match.params.id) {
//       const id: number = parseInt(this.props.match.params.id, 10);
//       const product = products.filter(p => p.id === id)[0];
//       this.setState({ product });
//     }
//   }

//   public render() {
//     const product = this.state.product;
//     return (
//       <div className="page-container">
//         <Prompt when={!this.state.added} message={this.navAwayMessage} />
//         {product ? (
//           <React.Fragment>
//             <h1>{product.name}</h1>
//             <p>{product.description}</p>
//             <p className="product-price">
//               {new Intl.NumberFormat("en-US", {
//                 currency: "USD",
//                 style: "currency"
//               }).format(product.price)}
//             </p>
//             {!this.state.added && (
//               <button onClick={this.handleAddClick}>Add to basket</button>
//             )}
//           </React.Fragment>
//         ) : (
//           <p>Product not found</p>
//         )}
//       </div>
//     );
//   }

//   private handleAddClick = () => {
//     this.setState({ added: true });
//   };

//   private navAwayMessage = () =>
//     "Are you sure you leave without buying this product?";
// }

const ProductPage: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const [addedState, setAddedState] = useState(false);
  const initialProduct: IProduct = {
    id: 0,
    name: "",
    description: "",
    price: 0
  };
  const [productState, setProductState] = useState(initialProduct);

  useEffect(() => {
    if (props.match.params.id) {
      const id: number = parseInt(props.match.params.id, 10);
      const product = products.filter(p => p.id === id)[0];
      setProductState(product);
    }
  }, []);

  const handleAddClick = () => {
    setAddedState(true);
  };

  const navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  return (
    <div className="page-container">
      <Prompt when={!addedState} message={navAwayMessage} />
      {productState.id ? (
        <React.Fragment>
          <h1>{productState.name}</h1>
          <p>{productState.description}</p>
          <p className="product-price">
            {new Intl.NumberFormat("en-US", {
              currency: "USD",
              style: "currency"
            }).format(productState.price)}
          </p>
          {!addedState && (
            <button onClick={handleAddClick}>Add to basket</button>
          )}
        </React.Fragment>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductPage;
