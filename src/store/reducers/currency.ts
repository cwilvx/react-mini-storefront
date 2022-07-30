import { ActionType } from "../actionTypes";
import {
  CurrencyStore,
  storeAction,
} from "./../../interfaces";

const initialState = {
  currencies: [],
  selected: "USD",
};

export default function CurrencyReducer(
  state: CurrencyStore = initialState,
  action: storeAction
) {
  switch (action.type) {
    case ActionType.INITIALIZE_STORE: {
      const { store } = action.payload;
      console.log(store);
      return {
        ...state,
        ...store,
      };
    }
    case ActionType.SET_CURRENCY: {
      const { currency } = action.payload;

      return {
        ...state,
        selected: currency,
      };
    }
    default: {
      return state;
    }
  }
}
