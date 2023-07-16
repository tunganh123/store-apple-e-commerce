import { useQuery } from "@tanstack/react-query";
import { useAlert } from "react-alert";
export const fetchData = async (
  url,
  token,
  method,
  datapost,
  check = { "Content-Type": "application/json" }
) => {
  const a = await fetch(`${process.env.REACT_APP_URL_FETCH}/` + url, {
    method: method,
    credentials: "include", // tao cookie phia client
    withCredentials: true, // gui cookie len server
    headers: {
      Authorization: "Bearer " + token,
      ...check,
    },
    body: datapost,
  });
  const b = await a.json();
  if (b?.err) {
    throw new Error(b.err);
  }
  return b;
};
const UseUrl = (url, token, method = "GET", datapost) => {
  const itemalert = useAlert();
  const querydata = useQuery({
    queryKey: [url],
    queryFn: () => fetchData(url, token, method, datapost),
    onError: (error) => itemalert.error(error.message),
  });
  return querydata;
};
export default UseUrl;
