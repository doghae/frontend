import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { StageSelection } from "./StageSelection";
import { UnderSection } from "./UnderSection";

export const Main = () => {
  const { token } = useAuth();

  useEffect(() => {
    // 토큰이 있을 때 서버에서 닉네임 정보를 가져오기
    if (token) {
      fetchNickname(token);
    }
  }, [token]);

  const fetchNickname = async (token: string) => {
    try {
      const response = await axios.get("https://doghae.site/user/nickname", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.nickname); // 받아온 닉네임을 콘솔에 출력
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  return (
    <Wrapper>
      <Grid
        h={{ base: "1200px", md: "1100px" }}
        w="100%"
        templateRows={{ base: "repeat(2, 1fr)", md: "1fr 500px" }}
        templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
        gap={{ base: 50, md: 100 }}
        p={{ base: 5, md: 8 }} /* 화면 크기에 따른 패딩 설정 */
      >
        <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
          <StageSelection />
        </GridItem>
        <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
          <UnderSection />
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-x: hidden; /* 수평 스크롤 숨김 */
`;

export default Main;
