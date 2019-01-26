import React, { useState, useEffect } from "react";
import { IProduct } from "./ProductsData";
import Tabs from "./Tabs";
import withLoader from "./withLoader";

interface IProps {
  product?: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
}

const Product: React.FC<IProps> = props => {
  const product = props.product;

  console.log(product);

  const handleAddClick = () => {
    props.onAddToBasket();
  };

  if (!product) {
    return null;
  }

  return (
    <React.Fragment>
      <h1>{product.name}</h1>

      <Tabs>
        <Tabs.Tab
          name="Description"
          initialActive={true}
          heading={() => <b>Description</b>}
        >
          <p>{product.description}</p>
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => "Reviews"}>
          <ul className="product-reviews">
            {product.reviews.map(review => {
              console.log(review);
              return (
                <li key={review.reviewer}>
                  <i>"{review.comment}"</i> - {review.reviewer}
                </li>
              );
            })}
          </ul>
        </Tabs.Tab>
      </Tabs>

      {/* <p>{product.description}</p>
      <div>
        <ul className="product-reviews">
          {product.reviews.map(review => (
            <li key={review.reviewer} className="product-reviews-item">
              <i>"{review.comment}"</i> - {review.reviewer}
            </li>
          ))}
        </ul>
      </div> */}
      <p className="product-price">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency"
        }).format(product.price)}
      </p>
      {!props.inBasket && (
        <button onClick={handleAddClick}>Add to basket</button>
      )}
    </React.Fragment>
  );
};

// export default Product;
export default withLoader(Product);
