import { url_be } from "..";
export const Fetchdata = async (value, path, tokennn) => {
  try {
    const a = await fetch(`${url_be}/${path}`, {
      method: "POST",
      body: JSON.stringify(value),
      credentials: "include",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + tokennn,
        "Content-Type": "application/json",
      },
    });
    if (a.status != 200) {
      throw new Error("Loi ket noi");
    }
    const b = a.json();
    return b;
  } catch (error) {
    console.log(error);
  }
};
export const Fetchdataget = async (path, tokennn) => {
  try {
    const a = await fetch(`${url_be}/${path}`, {
      credentials: "include", // tao cookie phia client
      withCredentials: true, // gui cookie len server
      headers: {
        Authorization: "Bearer " + tokennn,
        "Content-Type": "application/json",
      },
    });
    if (a.status != 200) {
      throw new Error("Loi ket noi");
    }
    const b = await a.json();
    return b;
  } catch (error) {
    console.log(error);
  }
};
export const randomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
