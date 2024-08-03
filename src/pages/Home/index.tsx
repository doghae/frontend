import { Contents } from "@/components/HomePage/Contents";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져와서 상태에 저장
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <Wrapper>
      {token ? (
        <Message>토큰은 {token}입니다. 로그인에 성공하셨습니다.</Message>
      ) : (
        <Contents />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #E8FFFF 0%, #ffffff 100%);
  overflow-x: hidden;
`;

const Message = styled.div`
  font-size: 20px;
  color: #000;
  text-align: center;
  margin-top: 20px;
`;

export default HomePage;
