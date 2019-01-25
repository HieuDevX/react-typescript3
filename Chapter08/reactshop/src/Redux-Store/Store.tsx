import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";

import { productsReducer } from "../Products/ProductsReducer";
import { IProductsState } from "../Products/ProductsTypes";

export interface IApplicationState {
  products: IProductsState;
}

const rootReducer = combineReducers<IApplicationState>({
  products: productsReducer
});

export default function configureStore(): Store<IApplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
