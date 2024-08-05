import styled from "@emotion/styled";
import { Grid, GridItem } from "@chakra-ui/react";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import { Section4 } from "./Section4";
import { Loginbox } from "./Loginbox";

export const Contents = () => {
  return (
    <Wrapper>
      <Grid
        h={{ base: "2000px", md: "2500px" }}
        w="100%"
        templateRows={{ base: "repeat(4, 1fr)", md: "1fr 300px 300px 500px" }}
        templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
        gap={{ base: 50, md: 100 }}
        p={{ base: 5, md: 8 }} /* 화면 크기에 따른 패딩 설정 */
      >
        <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
          <Section1 />
        </GridItem>
        <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
          <Section2 />
        </GridItem>
        <GridItem id="section3" rowSpan={1} backgroundColor={"transparent"}>
          <Section3 />
        </GridItem>
        <GridItem id="section4" rowSpan={1} backgroundColor={"transparent"}>
          <Section4 />
        </GridItem>
        <GridItem id="Loginbox" rowSpan={1} backgroundColor={"transparent"}>
          <Loginbox />
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden; /* 전체 스크롤 숨김 */
`;
