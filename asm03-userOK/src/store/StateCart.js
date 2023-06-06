import { createSlice } from "@reduxjs/toolkit";
import {
  getArrCart,
  removeArrCart,
  setArrCart,
} from "../localstorage/localstorage";
// Khai báo giá trị khởi tại cho Statecart
const initCart = {
  list: [],
  type: "",
};
// Cập nhật khi đăng nhập lại
let ArrCart = getArrCart();
if (ArrCart) {
  if (ArrCart.length != 0) {
    initCart.list = ArrCart;
  }
}
// Tạo Slice StateCart
const StateCart = createSlice({
  name: "Cart",
  initialState: initCart,
  reducers: {
    // Hàm addcart
    addcart(state, action) {
      let arr = [...state.list];
      // Kiểm tra dữ liệu muốn add có trùng với dữ liệu đã có trong mảng ko bằng check tên sản phẩm + tên user
      let index = state.list.findIndex(
        (ar) =>
          action.payload.item.name == ar.item.name &&
          action.payload.iduser == ar.iduser
      );
      // Nếu trùng
      if (index != -1) {
        // Cập nhật count mới của sp
        let countnew = Number(arr[index].count) + Number(action.payload.count);
        // Tạo item mới để cập nhật mảng
        let itemok = {
          ...arr[index],
          count: countnew,
        };
        // Xóa phần tử cũ ra khỏi mảng với vị trí tìm đc
        arr.splice(index, 1);
        // Cập nhật lại với vị trí cũ
        arr.splice(index, 0, itemok);
        // cập nhật lên localstorage
        removeArrCart();
        setArrCart(arr);
        // Cập nhật state vào store
        state.list = arr;
      } else {
        // Ngược lại thêm mới 1 sp
        let newArr = [...state.list, action.payload];
        // cập nhật vào storage
        removeArrCart();
        setArrCart(newArr);
        // Cập nhật state vào store
        state.list = newArr;
      }
    },
    updatecart(state, action) {
      // cập nhật state store
      state.list = action.payload;
    },
    deletecart(state, action) {
      // Xóa 1 sp
      const itemdelete = state.list.findIndex(
        // Lấy sp cần xóa với id và người dùng tương ứng
        (ar) =>
          // item.item._id.$oid == action.payload.item._id.$oid &&
          // action.payload.nameuser.email == item.nameuser.email
          action.payload.item.name == ar.item.name &&
          action.payload.iduser == ar.iduser
      );
      const arr = [...state.list];
      // Xóa sp ra khỏi mảng
      arr.splice(itemdelete, 1);
      // Cập nhật storage
      removeArrCart();
      setArrCart(arr);
      // cập nhật storage
      state.list = arr;
    },
    prevnextcart(state, action) {
      const arr = [...state.list];
      // Lấy ra vị trí của sản phẩm
      let index = arr.findIndex(
        (ar) =>
          // action.payload.item.name == ar.item.name &&
          // action.payload.nameuser.email == ar.nameuser.email
          action.payload.item.name == ar.item.name &&
          action.payload.iduser == ar.iduser
      );
      if (action.payload.type == "next") {
        // Nếu là next cập nhật count +1
        let countnew = Number(arr[index].count) + 1;
        let itemok = { ...arr[index], count: countnew };
        arr.splice(index, 1);
        arr.splice(index, 0, itemok);
        // cập nhật storage
        removeArrCart();
        setArrCart(arr);
        // Cập nhật store
        state.list = arr;
      }
      if (action.payload.type == "prev") {
        // Nếu là prev
        let countnew = Number(arr[index].count) - 1;
        let itemok = { ...arr[index], count: countnew };
        arr.splice(index, 1);
        arr.splice(index, 0, itemok);
        removeArrCart();
        setArrCart(arr);
        state.list = arr;
      }
    },
  },
});
export default StateCart;
