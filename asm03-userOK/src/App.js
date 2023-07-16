import "./App.css";
import { RouterProvider, createBrowserRouter, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import DetailPage from "./page/DetailPage";
import CartPage from "./page/CartPage";
import CheckoutPage from "./page/CheckoutPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ShopPage from "./page/ShopPage";
import History from "./page/History";
import DetailOrder from "./page/DetailOrder";
import { AppLayOut } from "./layout/AppLayOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayOut />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "shop", element: <ShopPage /> },
        { path: "detail/:id", element: <DetailPage /> },
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "4rem auto" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#18212f",
              color: "#e5e7eb",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
