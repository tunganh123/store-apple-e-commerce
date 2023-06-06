import "./App.css";
import { RouterProvider, createBrowserRouter, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import DetailPage from "./page/DetailPage";
import CartPage from "./page/CartPage";
import CheckoutPage from "./page/CheckoutPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ShopPage from "./page/ShopPage";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { fetchdata } from "./page/HomePage";
import History from "./page/History";
import DetailOrder from "./page/DetailOrder";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <HomePage />, loader: fetchdata },
        { path: "shop", element: <ShopPage />, loader: fetchdata },
        { path: "detail/:id", element: <DetailPage />, loader: fetchdata },
        {
          path: "cart",
          element: <CartPage />,
        },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "history", element: <History /> },
        { path: "detailorder/:iddetail", element: <DetailOrder /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
