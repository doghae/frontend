import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Header = () => {
  const REST_API_KEY = "af5896ef6b5436cd1b8d653c769c823e";
  const REDIRECT_URI = "https://doghae.vercel.app/";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져와서 상태에 저장
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Wrapper>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <Logo src="/images/logo.svg" />
          </Link>
        </div>
        <div>
          {token ? (
            <UserInfo>
              <UserIcon src="/images/user.svg" alt="user icon" />
              <UserName>{token.slice(0, 5)}님</UserName>
            </UserInfo>
          ) : (
            <LoginButton onClick={loginHandler}>로그인</LoginButton>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = "80px";

const Wrapper = styled.header`
  z-index: 100;
  height: ${HEADER_HEIGHT};
  padding: 16px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #f5ffff;
  box-shadow: 0px 2px 18px 2px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 48px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
  align-items: center; /* 수직 가운데 정렬 */
`;

const LoginButton = styled.button`
  display: inline-block;
  width: 100px;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
  color: #000; /* 글자 색상 */
  border: 2px solid #a2e1db; /* 테두리 */
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  background-color: transparent;
  text-decoration: none;

  &:hover {
    background-color: #a2e1db; /* 호버 시 배경 색상 */
    color: #fff; /* 호버 시 글자 색상 */
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const UserName = styled.div`
  display: inline-block;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #000; /* 글자 색상 */
  text-align: center;
  line-height: 40px;
  background-color: transparent;
`;

export default Header;
