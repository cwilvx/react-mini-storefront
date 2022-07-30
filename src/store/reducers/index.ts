import { combineReducers } from "redux";

import cart from "./cart";
import currency from "./currency";

export default combineReducers({ cart, currency });
