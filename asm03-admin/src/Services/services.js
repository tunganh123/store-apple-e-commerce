import UseUrl from "../hook/UseUrl";
import { useAlert } from "react-alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../hook/UseUrl";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setCookie } from "react-use-cookie";
import stateadmin from "../store/stateadmin";
import { useDispatch } from "react-redux";
const action = stateadmin.actions;
export const GetTransactionQuery = (token) => {
  let dataquery = UseUrl("getalltransaction", token);
  return dataquery;
};
export const GetListProductQuery = (token) => {
  let dataquery = UseUrl("getallproduct", token);
  return dataquery;
};
export const GetItemProductQuery = (token, idproduct) => {
  let dataquery = UseUrl(
    "detailproduct",
    token,
    "POST",
    JSON.stringify({ idproduct: idproduct })
  );
  return dataquery;
};
////////////////////////////////////////
export const AddProductMutate = () => {
  const queryClient = useQueryClient();
  const itemalert = useAlert();
  const navi = useNavigate();
  const querydataMutate = useMutation({
    mutationFn: async ({ token, datapost }) =>
      fetchData("addproduct", token, "POST", datapost, ""),
    onSuccess: async () => {
      itemalert.success("Thêm product thành công");
      await queryClient.refetchQueries({ queryKey: ["getallproduct"] });
      navi("/listproduct");
    },
    onError: (error) => itemalert.error(error.message),
  });
  return querydataMutate;
};
export const EditProductMutate = () => {
  const queryClient = useQueryClient();
  const itemalert = useAlert();
  const navi = useNavigate();
  const { mutate, isLoading: load } = useMutation({
    mutationFn: async ({ token, datapost, idproduct }) =>
      fetchData(
        `updatedetail/${idproduct}`,
        token,
        "POST",
        JSON.stringify(datapost)
      ),
    onSuccess: async () => {
      itemalert.success("Sửa product thành công");
      await queryClient.refetchQueries({ queryKey: ["getallproduct"] });
      navi("/listproduct");
    },
    onError: (error) => itemalert.error(error.message),
  });
  return { mutate, load };
};
export const DeleteProductMutate = () => {
  const queryClient = useQueryClient();
  const itemalert = useAlert();
  const { mutate, isLoading: load } = useMutation({
    mutationFn: async ({ idproduct, token }) => {
      let url = `deletedetail/${idproduct}`;
      fetchData(url, token, "DELETE");
    },
    onSuccess: async () => {
      itemalert.success("Xóa product thành công");
      queryClient.invalidateQueries("getallproduct");
    },
    onError: (error) => itemalert.error(error.message),
  });
  return { mutate, load };
};
export const LoginMutate = () => {
  const dispatch = useDispatch();
  const itemalert = useAlert();
  const navi = useNavigate();
  const querydataMutate = useMutation({
    mutationFn: async (datapost) =>
      fetchData("adminlogin", "", "POST", JSON.stringify(datapost)),
    onSuccess: async (result) => {
      itemalert.success("Đăng nhập thành công");
      if (result?.token) {
        const value = jwt_decode(result?.token);
        let dataadmin = {
          fullname: value.fullname,
          token: result.token,
        };
        setCookie("tokenadmin", result.token, { HttpOnly: true });
        dispatch(action.updateadmin(dataadmin));
        navi("/dashboard");
      }
    },
    onError: (error) => itemalert.error(error.message),
  });
  return querydataMutate;
};
