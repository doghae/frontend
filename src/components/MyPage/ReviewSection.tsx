import styled from "@emotion/styled";
import { Box, Text, Divider } from "@chakra-ui/react";

const ReviewSection = () => {
  return (
    <SectionWrapper>
      <Header>
        <StyledImg src="/images/developing.svg" alt="말풍선" />
        <Title>Review</Title>
      </Header>
      <ContentBox>
        <ContentTitle>복습하러 가기 &gt;</ContentTitle>
        <StyledDivider />
        <ContentText>
          틀린 문제들과 이전에 풀었던 문제들을 복습해 볼 수 있어요 🔥
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

const StyledImg = styled.img`
  margin-bottom: -17px;
`;

const Title = styled(Text)`
  font-size: 40px;
  font-weight: bold;
`;

const ContentBox = styled(Box)`
  width: 90%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #a2e1db;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #a2e1db;
    color: #ffffff;
  }
`;

const ContentTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledDivider = styled(Divider)`
  width: 80%; /* 길이를 ContentBox의 80%로 설정 */
  border-color: #ECEAE4; /* 색상을 두 번째 이미지와 동일하게 설정 */
  border-width: 2px; /* 두께를 설정 */
  margin-left: 0; /* 왼쪽 끝에 맞춤 */
  margin-top: -5px;
  margin-bottom: 7px;
`;

const ContentText = styled(Text)`
  font-size: 16px;
`;

export default ReviewSection;
