import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "react-use-cookie";
import jwt_decode from "jwt-decode";
// Khởi tạo giá trị ban đầu
let initUser = "";
// Trường hợp refresh
let token = getCookie("token");
if (token) {
  let userlivenow = jwt_decode(token);
  initUser = userlivenow;
}
// Tạo slice lưu thông tin người đang đăng nhập
const Statelogin = createSlice({
  name: "userlive",
  initialState: initUser,
  reducers: {
    // Login
    login(state, action) {
      return action.payload;
    },
    //Logout
    logout(state, action) {
      return "";
    },
  },
});
export default Statelogin;
