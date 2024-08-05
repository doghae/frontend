import styled from "@emotion/styled";
import { Grid, GridItem } from "@chakra-ui/react";
import { StageSelection } from "./StageSelection";

export const Main = () => (
  <Wrapper>
    <Grid
      h={{ base: "1000px", md: "1500px" }}
      w="100%"
      templateRows={{ base: "repeat(2, 1fr)", md: "1fr 1fr" }}
      templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
      gap={{ base: 50, md: 100 }}
      p={{ base: 5, md: 8 }} /* 화면 크기에 따른 패딩 설정 */
    >
      <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
        <StageSelection />
      </GridItem>
      <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
        <p>아랫 부분</p>
      </GridItem>
    </Grid>
  </Wrapper>
);

const Wrapper = styled.div`
  overflow: hidden; /* 전체 스크롤 숨김 */
`;

export default Main;
