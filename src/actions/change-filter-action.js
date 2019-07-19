export function changeShapeAction(f) {
  //console.log(f, "f");
  return {
    type: "CHANGE_SHAPE",
    payload: f
  };
}
export function changePriceAction(f) {
  //console.log(f, "f");
  return {
    type: "CHANGE_PRICE",
    payload: f
  };
}
export function changeCaratAction(f) {
  //console.log(f, "f");
  return {
    type: "CHANGE_CARAT",
    payload: f
  };
}
export function changeListViewAction(f) {
  //console.log(f, "f");
  return {
    type: "CHANGE_LIST_VIEW",
    payload: f
  };
}
