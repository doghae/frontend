import styled from "@emotion/styled";
import { Grid, GridItem } from "@chakra-ui/react";
import { StageSelection } from "./StageSelection";
import { UnderSection } from "./UnderSection";

export const Main = () => (
  <Wrapper>
    <Grid
      h={{ base: "900px", md: "1100px" }}
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

const Wrapper = styled.div`
  overflow-x: hidden; /* 수평 스크롤 숨김 */
`;

export default Main;
