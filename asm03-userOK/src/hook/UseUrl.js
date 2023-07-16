import { useQuery } from "@tanstack/react-query";
import { url_be } from "../utils/linkconstant";

export const UseUrl = (url, key, method = "GET", datapost, token) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const a = await fetch(`${url_be}/` + url, {
        method: method,
        credentials: "include", // tao cookie phia client
        withCredentials: true, // gui cookie len server
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datapost),
      });
      const b = await a.json();
      if (b.err) {
        throw new Error(b.err);
      }
      return b;
    },
  });
  return { isLoading, data, isError };
};
