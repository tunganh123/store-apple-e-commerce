// Hàm chuyển đổi định dạng số tiền
export const convert = (value) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  let vl = formatter.format(value);
  // Sử dụng glocal flag
  let res = vl.slice(1).replace(/,/g, ".");
  return res;
};
