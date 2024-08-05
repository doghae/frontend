import { Contents } from "@/components/HomePage/Contents";
import { Main } from "@/components/MyPage/Main"
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import styled from "@emotion/styled";

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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #e8ffff 0%, #ffffff 100%);
  overflow-x: hidden;
`;

export default HomePage;
