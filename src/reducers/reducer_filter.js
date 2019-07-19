const INITIAL_STATE = {
  shape: [],
  price: {
    min: 198,
    max: 500000
  },
  carat: {
    min: 0.18,
    max: 20.97
  },
  listView: "card"
};

function FilterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CHANGE_SHAPE":
      return { ...state, shape: action.payload };
    case "CHANGE_PRICE":
      return { ...state, price: action.payload };
    case "CHANGE_CARAT":
      return { ...state, carat: action.payload };
    case "CHANGE_LIST_VIEW":
      return { ...state, listView: action.payload };
    default:
      return state;
  }
}

export default FilterReducer;
