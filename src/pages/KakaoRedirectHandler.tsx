// src/pages/KakaoRedirectHandler.tsx

import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const KakaoRedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const authorizationCode = new URLSearchParams(location.search).get('code');
    if (authorizationCode) {
      getToken(authorizationCode);
    }
  }, [location]);

  const getToken = async (authorizationCode: string) => {
    const REST_API_KEY = "af5896ef6b5436cd1b8d653c769c823e";
    const REDIRECT_URI = "http://3.34.86.29:8080/oauth2/kakao/login";
    
    try {
      const response = await axios.post('http://3.34.86.29:8080/oauth2/kakao/token', {
        code: authorizationCode,
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      });

      const { access_token } = response.data;
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('token', access_token);

      // 토큰을 이용한 사용자 정보 요청 등 필요한 작업
    } catch (error) {
      console.error('토큰 요청 에러:', error);
    }
  };

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectHandler;
