import { combineReducers } from "redux";
import FilterReducer from "./reducer_filter";
import shapes from "./defaultShapes";
import DiamondReducer from "./diamondList";
import Cart from "./Cart";
import LoginReducer from "./Login";
import LoaderReducer from "./loader";

const rootReducer = combineReducers({
  filter: FilterReducer,
  defaultShapes: shapes,
  diamondList: DiamondReducer,
  cart: Cart,
  isLogin: LoginReducer,
  loader: LoaderReducer
});

export default rootReducer;
