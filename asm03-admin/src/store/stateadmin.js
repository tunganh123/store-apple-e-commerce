import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "react-use-cookie";
import jwt_decode from "jwt-decode";
let initadmin = {
  fullname: "",
  token: "",
};
// Trường hợp refresh
let token = getCookie("tokenadmin");
if (token) {
  let userlivenow = jwt_decode(token);
  initadmin = {
    fullname: userlivenow.fullname,
    token: token,
  };
}

const stateadmin = createSlice({
  name: "admin",
  initialState: initadmin,
  reducers: {
    updateadmin(state, action) {
      state.fullname = action.payload.fullname;
      state.token = action.payload.token;
    },
    logoutadmin(state, action) {
      return (state = initadmin);
    },
  },
});
export default stateadmin;
