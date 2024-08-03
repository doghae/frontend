import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { Layout } from "@/components/Layout";
import { NoFooterLayout } from "@/components/Layout/noFooterIndex";
import { RouterPath } from "./path";
import { Terms } from "@/pages/Extra/Terms";
import { Privacy } from "@/pages/Extra/Privacy";
import { Contact } from "@/pages/Extra/Contact";
import KakaoRedirectHandler from "@/pages/KakaoRedirectHandler"; // Import KakaoRedirectHandler

const router = createBrowserRouter([
  {
    // with footer
    path: RouterPath.root,
    element: <Layout />,
    children: [{ path: RouterPath.home, element: <HomePage /> }],
  },
  {
    // without footer
    path: RouterPath.root,
    element: <NoFooterLayout />,
    children: [
      { path: RouterPath.terms, element: <Terms /> },
      { path: RouterPath.privacy, element: <Privacy /> },
      { path: RouterPath.contact, element: <Contact /> },
    ],
  },
  {
    // Kakao redirect handler
    path: RouterPath.kakaoLogin, // Define this path in RouterPath
    element: <KakaoRedirectHandler />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
