import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext"; // UserContext import
import { StageSelection } from "./StageSelection";
import { UnderSection } from "./UnderSection";

export const Main = () => {
  const { token } = useAuth();
  const { state, dispatch } = useUser(); // UserContext 사용

  useEffect(() => {
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
      const nickname = response.data.data; // 닉네임 추출
      dispatch({ type: "SET_NICKNAME", payload: nickname }); // 상태 업데이트
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
        p={{ base: 5, md: 8 }}
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
  overflow-x: hidden;
`;

export default Main;
