import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomePage from "@/pages/Home";
import axios from "axios";

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

const RedirectHandler: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const code = query.get("code");

  useEffect(() => {
    const handleRedirect = async () => {
      if (code) {
        console.log("Authorization code:", code);
        // API 호출 및 후속 작업
        try {
          await kakaoLogin(code, navigate);
        } catch (error) {
          console.error("소셜로그인 에러", error);
        }
      }
    };

    handleRedirect();
  }, [code, navigate]);

  if (!code) {
    return <HomePage />;
  }

  return <div>Redirecting...</div>;
};

const kakaoLogin = async (code: string, navigate: any) => {
  try {
    const res = await axios.get(
      `http://doghae.site/oauth2/kakao/login?code=${code}`
    );
    console.log(res);

    const ACCESS_TOKEN = res.data.accessToken;
    localStorage.setItem("token", ACCESS_TOKEN);

    navigate("/main", { replace: true });
  } catch (err) {
    // Type assertion for AxiosError
    if (axios.isAxiosError(err)) {
      console.error(
        "소셜로그인 에러",
        err.response ? err.response.data : err.message
      );
    } else {
      console.error("소셜로그인 에러", err);
    }
    window.alert("로그인에 실패하였습니다.");
    //navigate("/login", { replace: true });
  }
};

export default RedirectHandler;
