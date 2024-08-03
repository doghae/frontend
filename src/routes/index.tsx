import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { Layout } from "@/components/Layout";
import { NoFooterLayout } from "@/components/Layout/noFooterIndex";
import { RouterPath } from "./path";
import { Terms } from "@/pages/Extra/Terms";
import { Privacy } from "@/pages/Extra/Privacy";
import { Contact } from "@/pages/Extra/Contact";

const router = createBrowserRouter([
  { // with footer
    path: RouterPath.root,
    element: <Layout />,
    children: [
      { path: RouterPath.home, element: <HomePage /> },
    ],
  },
  { // without footer
    path: RouterPath.root,
    element: <NoFooterLayout />,
    children: [
      { path: RouterPath.terms, element: <Terms /> },
      { path: RouterPath.privacy, element: <Privacy /> },
      { path: RouterPath.contact, element: <Contact /> },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
