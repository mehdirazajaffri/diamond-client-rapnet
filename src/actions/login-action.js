// export function loginAction(f) {
//   //console.log(f, "f");
//   return {
//     type: "LOGIN",
//     payload: f
//   };
// }

export const loginAction = (email, password) => ({
  type: "AUTH_REQUEST",
  payload: { email, password }
});
export const hasTokenAction = token => ({
  type: "HAS_TOKEN",
  payload: { token }
});
export const logoutAction = token => ({
  type: "LOGOUT"
});
