export function addDiamondAction(f) {
  //console.log(f, "f");
  return {
    type: "ADD_DIAMOND",
    payload: f
  };
}
export function addDiamondAllAction(f) {
  //console.log(f, "f");
  return {
    type: "ADD_DIAMOND_ALL",
    payload: f
  };
}
