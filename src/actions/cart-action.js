export function addCartAction(f) {
  //console.log(f, "f");
  return {
    type: "ADD_CART",
    payload: f
  };
}
export function removeItemAction(f) {
  //console.log(f, "f");
  return {
    type: "REMOVE_ITEM",
    payload: f
  };
}
export function removeAllItemsAction(f) {
  //console.log(f, "f");
  return {
    type: "REMOVE_ALL",
    payload: f
  };
}
