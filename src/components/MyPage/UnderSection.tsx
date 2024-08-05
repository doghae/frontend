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
  gap: 20px; /* 두 섹션 사이의 간격 조절 */
`;

const LeftSection = styled(Box)`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdBanner = styled(Box)`
  width: 100%;
  height: 100%;
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
