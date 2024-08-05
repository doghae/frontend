import styled from "@emotion/styled";
import { Img, Box, Text } from "@chakra-ui/react";

const MypageSection = () => {
  return (
    <SectionWrapper>
      <Header>
        <Img src="/images/developing.svg" alt="말풍선" />
        <Title>Mypage</Title>
      </Header>
      <ContentBox>
        <ContentTitle>내정보 수정 &gt;</ContentTitle>
        <ContentText>
          닉네임 변경, 멤버십 변경 등 계정 관련 기능들이 있어요 😎
        </ContentText>
      </ContentBox>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  gap: 10px;
`;

const Header = styled(Box)`
  display: flex;
  flex-direction: column; /* 상하 배치로 변경 */
  align-items: flex-start; /* 왼쪽 정렬 */
  gap: 10px;
`;

const Title = styled(Text)`
  font-size: 40px;
  font-weight: bold;
`;

const ContentBox = styled(Box)`
  width: 80%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #a2e1db;
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
