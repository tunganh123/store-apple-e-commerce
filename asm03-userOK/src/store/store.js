import {} from "react-redux";
import Statedetail from "./Statedetail";
import { configureStore } from "@reduxjs/toolkit";
import Statelogin from "./Statelogin";
import StateCart from "./StateCart";
const store = configureStore({
  reducer: {
    detail: Statedetail.reducer,
    userlogin: Statelogin.reducer,
    cart: StateCart.reducer,
  },
});
export default store;
