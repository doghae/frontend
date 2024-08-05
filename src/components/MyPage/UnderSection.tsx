import styled from "@emotion/styled";
import { Box, Flex } from "@chakra-ui/react";
import ReviewSection from "./ReviewSection";
import MypageSection from "./MypageSection";

export const UnderSection = () => {
  return (
    <Wrapper>
      <LeftSection>
        <ReviewSection />
        <MypageSection />
      </LeftSection>
      <RightSection>
        <AdBanner>광고 배너</AdBanner>
      </RightSection>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 30px; /* 두 섹션 사이의 간격 조절 */
`;

const LeftSection = styled(Box)`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const RightSection = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: flex-end; /* 하단 정렬 */
  padding: 0px; /* 추가된 패딩 */
  position: relative; /* 위치 조정을 위한 설정 */
`;

const AdBanner = styled(Box)`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  border-radius: 10px;
  border: 1px solid #a2e1db;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default UnderSection;
