import React, { useState, useEffect } from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { IProduct, products, IReview, getProduct } from "./ProductsData";

import Product from "./Product";

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

  const initialReviews: IReview[] = [];
  const initialProduct: IProduct = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    reviews: initialReviews
  };

  const [productState, setProductState] = useState(initialProduct);

  const [loadingState, setLoadingState] = useState(true);

  const fetchData = async () => {
    if (props.match.params.id) {
      const id: number = parseInt(props.match.params.id, 10);
      const product = await getProduct(id);
      if (product !== null) {
        setProductState(product);
        setLoadingState(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setAddedState(true);
  };

  const navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  return (
    <div className="page-container">
      <Prompt when={!addedState} message={navAwayMessage} />
      {productState.id || loadingState ? (
        <Product
          loading={loadingState}
          product={productState}
          inBasket={addedState}
          onAddToBasket={handleAddClick}
        />
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductPage;
