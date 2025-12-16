import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import CryptoCash from "./pages/CryptoCash";

import "./index.css";
import CashCrypto from "./pages/CashCrypto";
import CryptoFiat from "./pages/CrpytoFiat";
import RecipientDetails from "./pages/RecipientDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CryptoCash />
      },
      {path: "/cash-to-crypto", element: <CashCrypto /> },
      {path: "/crypto-to-fiat", element: <CryptoFiat /> },
      {path: "/recipient-details", element: <RecipientDetails /> },
    ],
  },
]);

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
