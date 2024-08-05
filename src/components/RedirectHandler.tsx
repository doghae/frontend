import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomePage from "@/pages/Home";
import axios from "axios";
import api from "../api";

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
    const res = await api.get(`/oauth2/kakao/login?code=${code}`, {
      withCredentials: true,
    });
    console.log(res);

    // Authorization 헤더 추출
    const ACCESS_TOKEN = res.headers['authorization'];
    console.log("ACCESS_TOKEN", ACCESS_TOKEN);

    // 로컬 스토리지에 토큰 저장
    localStorage.setItem("token", ACCESS_TOKEN);
    //로그인 성공 후 메인페이지로 이동
    navigate("/", { replace: true });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "소셜로그인 에러",
        err.response ? err.response.data : err.message
      );
    } else {
      console.error("소셜로그인 에러", err);
    }
    window.alert("로그인에 실패하였습니다.");
  }
};

export default RedirectHandler;
