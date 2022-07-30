import { ActionType } from "../actionTypes";
import { Currency, CurrencyStore, storeAction } from "./../../interfaces";

const initialState = {
  currencies: [],
  selected: {} as Currency,
};

export default function CurrencyReducer(
  state: CurrencyStore = initialState,
  action: storeAction
) {
  switch (action.type) {
    case ActionType.INITIALIZE_STORE: {
      const { store } = action.payload;
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
