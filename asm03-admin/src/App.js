import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Addproduct from "./page/Addproduct";
import Editproduct from "./page/Editproduct";
import Listproduct from "./page/Listproduct";
import Login from "./page/Login";
import Livechat from "./page/Livechat";
import { Applayout } from "./layout/Applayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Applayout />}>
            <Route index element={<Navigate to={"dashboard"} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="livechat" element={<Livechat />} />
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="listproduct" element={<Listproduct />} />
            <Route path="editproduct/:idproduct" element={<Editproduct />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
