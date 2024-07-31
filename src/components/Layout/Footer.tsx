import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <Description>
          일상 속 잘 모르는 표현들로 인해 답답한 적이 있나요?
          <br />
          문해력 테스트 서비스, 독하다 독해!
        </Description>
        <Divider />

        <LinkWrapper>
          <StyledLink to="/terms">이용약관</StyledLink>
          <StyledLink2 to="/privacy">개인정보처리방침</StyledLink2>
          <StyledLink to="/contact">문의</StyledLink>
        </LinkWrapper>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  height: 200px;
  padding: 20px 40px;
  background-color: #edfffe;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  text-align: center;
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  color: #1c1c1e;
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  letter-spacing: -0.02em;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #55cbcd;
  width: 100%;
  max-width: 1200px; /* 원하는 너비로 설정 */
  margin: -10px auto 20px auto; /* 중앙 정렬을 위해 auto 사용 */
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 150px; /* 링크들 사이의 간격을 설정 */
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: #3c3c3f;
  font-weight: 400;
  line-height: 16.8px;
  letter-spacing: -0.025em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledLink2 = styled(Link)`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: #3c3c3f;
  font-weight: 700;
  line-height: 16.8px;
  letter-spacing: -0.02em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Footer;
