const INITIAL_STATE = {
  diamondList: [],
  diamondListAll: []
};

function DiamondReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_DIAMOND":
      return {
        ...state,
        diamondList: action.payload
      };
    case "ADD_DIAMOND_ALL":
      return {
        ...state,
        diamondListAll: action.payload
      };
    default:
      return state;
  }
}

export default DiamondReducer;
