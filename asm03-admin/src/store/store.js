import stateadmin from "./stateadmin";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    admin: stateadmin.reducer,
  },
});
export default store;
