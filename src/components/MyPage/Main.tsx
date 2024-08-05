import styled from "@emotion/styled";
import { Box, Text, Flex } from "@chakra-ui/react";

const stages = ["12th", "11th", "10th", "9th", "8th", "7th", "6th", "..."];

export const Main = () => (
  <Wrapper>
    <Title>Stage. 12</Title>
    <StageNav>
      {stages.map((stage) => (
        <StageItem key={stage}>{stage}</StageItem>
      ))}
    </StageNav>
    <ContentWrapper>
      <ContentBox>
        <ContentTitle>오늘의 문제 &gt;</ContentTitle>
        <ContentText>1/5 고급어휘 3 중급어휘 1 초급어휘 1</ContentText>
      </ContentBox>
      <ContentBox>
        <ContentTitle>복습 &gt;</ContentTitle>
        <ContentText>반복하지 않으면 배울 수 없다. - 그리스 격언</ContentText>
      </ContentBox>
      <AdBox>
        <Text>메가스터디 광고</Text>
      </AdBox>
    </ContentWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  background: linear-gradient(180deg, #e8ffff 0%, #ffffff 100%);
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const StageNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const StageItem = styled.div`
  padding: 10px;
  background-color: #a2e1db;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
`;

const ContentWrapper = styled(Flex)`
  justify-content: center;
  gap: 20px;
`;

const ContentBox = styled(Box)`
  padding: 20px;
  background-color: #a2e1db;
  border-radius: 10px;
  flex: 1;
  max-width: 300px;
  min-width: 200px;
`;

const AdBox = styled(Box)`
  padding: 20px;
  background-color: #d3d3d3;
  border-radius: 10px;
  flex: 1;
  max-width: 300px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentText = styled(Text)`
  font-size: 16px;
`;

export default Main;
