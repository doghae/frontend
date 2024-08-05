import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomePage from "@/pages/Home";
import axios from "axios";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

const RedirectHandler: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const code = query.get("code");
  const { setToken } = useAuth();

  useEffect(() => {
    const handleRedirect = async () => {
      if (code) {
        console.log("Authorization code:", code);
        // API 호출 및 후속 작업
        try {
          await kakaoLogin(code, navigate, setToken);
        } catch (error) {
          console.error("소셜로그인 에러", error);
        }
      }
    };

    handleRedirect();
  }, [code, navigate, setToken]);

  if (!code) {
    return <HomePage />;
  }

  return <div>Redirecting...</div>;
};

const kakaoLogin = async (code: string, navigate: any, setToken: (token: string | null) => void) => {
  try {
    const res = await api.get(`/oauth2/kakao/login?code=${code}`, {
      withCredentials: true,
    });
    console.log("Response Headers:", res.headers);

    // Authorization 헤더 추출 시 여러 방법을 시도
    const ACCESS_TOKEN = res.headers['authorization'] || res.headers.Authorization;
    console.log("ACCESS_TOKEN", ACCESS_TOKEN);

    // 토큰이 undefined인 경우 에러 처리
    if (!ACCESS_TOKEN) {
      throw new Error("유효하지 않은 토큰");
    }

    // 로컬 스토리지에 토큰 저장
    localStorage.setItem("token", ACCESS_TOKEN);
    // Context API를 통해 토큰 설정
    setToken(ACCESS_TOKEN);
    // 로그인 성공 후 메인 페이지로 이동
    navigate("/", { replace: true });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "소셜로그인 에러",
        err.response ? err.response.data : err.message
      );
    } else {
      console.error("소셜로그인 에러", (err as Error).message);
    }
    window.alert("로그인에 실패하였습니다.");
  }
};

export default RedirectHandler;
