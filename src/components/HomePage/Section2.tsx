import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Text as ChakraText, Image, Flex } from "@chakra-ui/react";

export const Section2 = () => {
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
          <Title>요즘 쓰지도 않는 표현 그렇게 중요해? 🤔</Title>
          <Logo src="/images/underline.svg" />
        </TitleContainer>
        <Text isVisible={isVisible}>
          세대 간 차이가 있기 때문에 모르는 표현이 있는 것은 당연합니다.
        </Text>
        <Text isVisible={isVisible}>
          하지만 살아가다 보면 다양한 사람들을 만나게 되고,
        </Text>
        <Text isVisible={isVisible}>
          대화를 할 때 모르는 단어나 표현으로 인해 답답한 경우도 많이 생깁니다.
        </Text>
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
  width: 710px;
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
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(20px)"};
`;

export default Section2;
