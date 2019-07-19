export function loaderAction(f) {
  //console.log(f, "f");
  return {
    type: "LOADER",
    payload: f
  };
}
