import { createSlice } from "@reduxjs/toolkit";
// Khởi tạo trạng thai ban đầu
const initDetail = {
  check: false,
  detail: "",
};
// Khởi tạo slice Statedetail phục vụ modal
const Statedetail = createSlice({
  name: "detail",
  initialState: initDetail,
  reducers: {
    //Show
    show_popup(state, action) {
      return {
        check: true,
        detail: action.payload,
      };
    },
    //Hide
    hide_popup(state, action) {
      return {
        check: false,
        detail: "",
      };
    },
  },
});
export default Statedetail;
