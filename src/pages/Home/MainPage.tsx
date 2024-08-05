import styled from '@emotion/styled';
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <Wrapper>
      <p>메인페이지</p>
      <StyledLink to="/quiz">문제풀이</StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
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