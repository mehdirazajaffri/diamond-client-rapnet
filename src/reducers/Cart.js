import Cookies from "universal-cookie";
const INITIAL_STATE = {
  Cart: [],
  total: ""
};

function CartReducer(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        Cart: [...state.Cart, action.payload],
        total: Number(state.total) + Number(action.payload.total_sales_price)
      };
    case "REMOVE_ITEM":
      let itemToRemove = state.Cart.find(
        item => action.payload.id === item.diamond_id
      );
      let new_items = state.Cart.filter(
        item => action.payload.id !== item.diamond_id
      );

      // //calculating the total
      // let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
      const cookies = new Cookies();
      cookies.set("cart", new_items, { path: "/" });
      return {
        ...state,
        Cart: new_items,
        total: Number(state.total) - Number(itemToRemove.total_sales_price)
      };
    case "REMOVE_ALL":
      return {
        Cart: [],
        total: null
      };
    default:
      return state;
  }
}

export default CartReducer;
