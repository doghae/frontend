import styled from "@emotion/styled";
import { Img, Box, Text } from "@chakra-ui/react";

const ReviewSection = () => {
  return (
    <SectionWrapper>
      <Header>
      <Img src='/images/developing.svg' alt="말풍선" />
        <Title>Review</Title>
      </Header>
      <ContentBox>
        <ContentTitle>복습하러 가기 &gt;</ContentTitle>
        <ContentText>틀린 문제들과 이전에 풀었던 문제들을 복습해 볼 수 있어요 🔥</ContentText>
      </ContentBox>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SpeechBubble = styled.img`
  height: 20px;
`;

const Title = styled(Text)`
  font-size: 40px;
  font-weight: bold;
`;

const ContentBox = styled(Box)`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContentTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentText = styled(Text)`
  font-size: 16px;
`;

export default ReviewSection;
