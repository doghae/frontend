import styled from "@emotion/styled";
import { Grid, GridItem } from "@chakra-ui/react";
import { StageSelection } from "./StageSelection";
import { UnderSection } from "./UnderSection";

export const Main = () => (
  <Wrapper>
    <StyledGrid
      h={{ base: "1000px", md: "1500px" }}
      w="100%"
      templateRows={{ base: "repeat(2, 1fr)", md: "500px 500px" }}
      templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
      gap={{ base: 50, md: 50 }}
      p={{ base: 5, md: 8 }} /* 화면 크기에 따른 패딩 설정 */
    >
      <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
        <StageSelection />
      </GridItem>
      <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
        <UnderSection />
      </GridItem>
    </StyledGrid>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 전체 스크롤 숨김 */
`;

const StyledGrid = styled(Grid)`
  overflow-y: auto; /* 내부 스크롤 허용 */
  height: 100%; /* 그리드 높이를 부모의 높이에 맞춤 */
`;

export default Main;
