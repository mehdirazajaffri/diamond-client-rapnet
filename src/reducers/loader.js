const INITIAL_STATE = {
  loader: false
};

function LoaderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOADER":
      return {
        ...state,
        loader: action.payload
      };
    default:
      return state;
  }
}

export default LoaderReducer;
