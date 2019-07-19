// const INITIAL_STATE = {
//   auth: {
//     isLogin: false,
//     name: ""
//   }
// };

// function LoginReducer(state = INITIAL_STATE, action) {
//   console.log(action, "LoginReducer");
//   switch (action.type) {
//     case "LOGIN_USER_SUCCESS":
//       console.log(action, "LOGIN_USER_SUCCESS");
//       return {
//         ...state,
//         auth: action.payload
//       };
//     case "LOGIN_USER_ERROR":
//       return {
//         ...state,
//         auth: action.payload
//       };
//     default:
//       return state;
//   }
// }

// export default LoginReducer;

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const TOKEN_VERIFIED = "TOKEN_VERIFIED";
export const TOKEN_NOT_VERIFIED = "TOKEN_NOT_VERIFIED";
export const LOGOUT = "LOGOUT";

const initialState = {
  token: localStorage.getItem("token"),
  error: null
};

const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS: {
      return { ...state, token: payload };
    }
    case AUTH_FAILURE: {
      return { ...state, error: payload };
    }
    case TOKEN_VERIFIED: {
      return { ...state, user: payload };
    }
    case TOKEN_NOT_VERIFIED: {
      return { ...state, error: payload };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return { state: {} };
    }
    default:
      return state;
  }
};

export default LoginReducer;
