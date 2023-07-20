import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { url_be } from "../utils/linkconstant";
import { useQueryClient } from "@tanstack/react-query";
import { UseUrl } from "../hook/UseUrl";
import { setCookie } from "react-use-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import Statelogin from "../store/Statelogin";

const fetchdata = async (url, datapost, token) => {
  const a = await fetch(`${url_be}/${url}`, {
    method: "POST",
    body: JSON.stringify(datapost),
    credentials: "include", // tao cookie phia client
    withCredentials: true, // gui cookie len server
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  if (!a.ok) {
    throw new Error();
  }
  const b = await a.json();
  if (b.err) {
    throw new Error(b.err);
  }
  return { b, datapost };
};
export const CheckoutMutate = () => {
  // Access the client
  const queryClient = useQueryClient();
  const navi = useNavigate();
  const { mutate } = useMutation({
    mutationFn: ({ data, token }) => fetchdata("addorder", data, token),
    onSuccess: async ({ datapost }) => {
      datapost.products.forEach(async (it) => {
        await queryClient.refetchQueries({
          queryKey: [it.product._id],
        });
      });
      await queryClient.refetchQueries({
        queryKey: ["getorder"],
      });
      toast.success("SUCCESS ADD ORDER");
      navi("/history");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate };
};
export const RegisterMutate = () => {
  // Access the client
  const navi = useNavigate();
  ////
  const { mutate, isLoading } = useMutation({
    mutationFn: (datapost) => fetchdata("register", datapost),
    onSuccess: async () => {
      toast.success("SUCCESS REGISTER");
      navi("/login");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
};
export const LoginMutate = () => {
  // Khai báo dispatch
  const dispatch = useDispatch();
  const navi = useNavigate();
  // Lấy các hàm action từ Statelogin
  const action = Statelogin.actions;
  const { mutate, data, isLoading } = useMutation({
    mutationFn: (datapost) => fetchdata("login", datapost),
    onSuccess: async ({ b }) => {
      toast.success("SUCCESS LOGIN");
      setCookie("token", b.token, {
        HttpOnly: true,
      });
      const resultvalue = jwt_decode(b.token);
      dispatch(action.login({ ...resultvalue, token: b.token }));
      navi("/");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, data, isLoading };
};
export const OrderHistoryService = (iduser, token) => {
  return UseUrl("getorder", "getorder", "POST", { iduser: iduser }, token);
};
export const OrderDetailService = (iddetailorder, token) => {
  return UseUrl(
    "getdetailorder",
    "getdetailorder",
    "POST",
    { iddetailorder: iddetailorder },
    token
  );
};
export const GetProductService = () => {
  return UseUrl("getproduct", "getproduct");
};
