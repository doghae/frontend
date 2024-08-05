import styled from "@emotion/styled";
import { Grid, GridItem } from "@chakra-ui/react";
import { StageSelection } from "./StageSelection";
import { UnderSection } from "./UnderSection";

export const Main = () => (
  <Wrapper>
    <Grid
      h={{ base: "100vh", md: "150vh" }} /* 화면 높이에 따라 조정 */
      w="100%"
      templateRows={{ base: "repeat(2, 1fr)", md: "1fr 1fr" }}
      templateColumns={{ base: "1fr", md: "1fr" }}
      gap={{ base: 4, md: 8 }} /* 화면 크기에 따른 간격 설정 */
      p={{ base: 4, md: 8 }} /* 화면 크기에 따른 패딩 설정 */
    >
      <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
        <StageSelection />
      </GridItem>
      <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
        <UnderSection/>
      </GridItem>
    </Grid>
  </Wrapper>
);

const Wrapper = styled.div`
  overflow-x: hidden; /* 수평 스크롤 숨김 */
`;

export default Main;
