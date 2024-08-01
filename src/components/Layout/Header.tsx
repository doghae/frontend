import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Header = () => {
  const kakaoLoginUrl = "http://3.34.86.29:8080/oauth/kakao";

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
          <LoginButton href={kakaoLoginUrl}>로그인</LoginButton>
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

const LoginButton = styled.a`
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
  text-decoration: none;

  &:hover {
    background-color: #a2e1db; /* 호버 시 배경 색상 */
    color: #fff; /* 호버 시 글자 색상 */
  }
`;

export default Header;
