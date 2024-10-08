import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Text as ChakraText, Image, Flex } from "@chakra-ui/react";

export const Section3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper ref={ref}>
      <LogoWrapper isVisible={isVisible}>
        <TitleContainer>
          <Title>어휘 = 요리의 재료 😉</Title>
          <Logo src="/images/underline.svg" />
        </TitleContainer>
        <Text isVisible={isVisible}>어휘는 마치 요리의 재료와도 비슷합니다.</Text>
        <Text isVisible={isVisible}>다양한 요리 재료를 적절하게 사용해서 우리의 입을 즐겁게 해준다면, </Text>
        <Text isVisible={isVisible}>다양한 어휘는 원활한 대화를 통해 상대방과 깊은 소통을 할 수 있는</Text>
        <Text isVisible={isVisible}>기회와 기쁨을 안겨줍니다.</Text>
      </LogoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LogoWrapperProps {
  isVisible: boolean;
}

const LogoWrapper = styled.div<LogoWrapperProps>`
  width: 100%;
  max-width: 1200px;
  text-align: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const TitleContainer = styled(Flex)`
  flex-direction: column;
  align-items: left;
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled(ChakraText)`
  font-size: 40px;
  font-weight: bold;
  text-align: left;
`;

const Logo = styled(Image)`
  width: 390px;
  margin-bottom: 5px;
`;

interface TextProps {
  isVisible: boolean;
}

const Text = styled(ChakraText)<TextProps>`
  font-size: 26px;
  color: #333;
  margin-bottom: 5px;
  margin-left: 10px;
  text-align: left;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? "translateY(0)" : "translateY(20px)")};
`;

export default Section3;
