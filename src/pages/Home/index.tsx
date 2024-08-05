import { Contents } from "@/components/HomePage/Contents";
import { Main } from "@/components/MyPage/Main"
import styled from "@emotion/styled";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const HomePage = () => {
  const { token} = useAuth();

  useEffect(() => {
    // 토큰이 있을 때 stage/1에 대한 정보를 가져오기
    if (token) {
      fetchStageData(token);
    }
  }, [token]);

  const fetchStageData = async (token: string) => {
    try {
      const response = await axios.get("https://doghae.site/stage/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // 받아온 데이터 콘솔에 출력
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  return (
    <Wrapper>
      {token ? <Main /> : <Contents />}
      <StyledLink to="/quiz">문제풀이</StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #e8ffff 0%, #ffffff 100%);
  overflow-x: hidden;
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

export default HomePage;
