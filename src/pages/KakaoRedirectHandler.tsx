// src/pages/KakaoRedirectHandler.tsx

import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const KakaoRedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const authorizationCode = new URLSearchParams(location.search).get("code");
    if (authorizationCode) {
      getToken(authorizationCode);
    }
  }, [location]);

  const getToken = async (authorizationCode: string) => {
    try {
      const response = await axios.get(
        `http://3.34.86.29:8080/oauth2/kakao/login?code=${authorizationCode}`
      );

      const { access_token } = response.data;

      // 콘솔에 토큰 출력
      console.log("받아온 토큰:", access_token);

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("token", access_token);

      // 메인 페이지로 리디렉션 또는 필요한 작업 수행
      window.location.href = "/";
    } catch (error) {
      console.error("토큰 요청 에러:", error);
      console.log("실패");
    }
  };

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectHandler;
