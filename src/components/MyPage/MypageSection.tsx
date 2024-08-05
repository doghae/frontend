import styled from "@emotion/styled";
import { Img, Box, Text } from "@chakra-ui/react";

const MypageSection = () => {
  return (
    <SectionWrapper>
      <Header>
        <Img src='/images/developing.svg' alt="말풍선" />
        <Title>Mypage</Title>
      </Header>
      <ContentBox>
        <ContentTitle>내정보 수정 &gt;</ContentTitle>
        <ContentText>닉네임 변경, 멤버십 변경 등 계정 관련 기능들이 있어요 😎</ContentText>
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

export default MypageSection;
