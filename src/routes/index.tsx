import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { Layout } from "@/components/Layout";
import { NoFooterLayout } from "@/components/Layout/noFooterIndex";
import { RouterPath } from "./path";
import { Terms } from "@/pages/Extra/Terms";
import { Privacy } from "@/pages/Extra/Privacy";
import { Contact } from "@/pages/Extra/Contact";
import { Quiz } from "@/pages/Home/QuizScreen";
import RedirectHandler from "@/components/RedirectHandler"; // import 추가

const router = createBrowserRouter([
  {
    // with footer
    path: RouterPath.root,
    element: <Layout />,
    children: [
      { path: RouterPath.home, element: <RedirectHandler /> }, // 홈 페이지 대신 리디렉트 핸들러 추가
      { path: RouterPath.home, element: <HomePage /> }, // 필요에 따라 홈 페이지 경로 추가
    ],
  },
  {
    // without footer
    path: RouterPath.root,
    element: <NoFooterLayout />,
    children: [
      { path: RouterPath.terms, element: <Terms /> },
      { path: RouterPath.privacy, element: <Privacy /> },
      { path: RouterPath.contact, element: <Contact /> },
      { path: `${RouterPath.quiz}/:stage`, element: <Quiz /> }, // 수정된 경로 설정
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
