import styled from "@emotion/styled";
import { Box, Flex } from "@chakra-ui/react";
import ReviewSection from "./ReviewSection";
import MypageSection from "./MypageSection";

export const UnderSection = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LeftSection>
          <ReviewSection />
          <MypageSection />
        </LeftSection>
        <RightSection>
          <AdBanner>광고 배너</AdBanner>
        </RightSection>
      </LogoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;
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
  width: 80%;
  height: 80%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`;

export default UnderSection;
