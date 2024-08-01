import React, { useEffect, useRef, useState } from "react";
import { Grid, GridItem, Img } from "@chakra-ui/react";
import { Text as ChakraText, Image, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Section4 = () => {
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
          <Title>서비스 소개 👀</Title>
          <Logo src="/images/underline.svg" />
        </TitleContainer>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {cardContents.map((content, index) => (
            <StyledGridItem key={index} isVisible={isVisible}>
              <StyledImg
                src={content.imageSrc}
                alt={`gif파일${index + 1}`}
                isVisible={isVisible}
              />
            </StyledGridItem>
          ))}
        </Grid>
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
  margin-bottom: 30px;
`;

const Title = styled(ChakraText)`
  font-size: 40px;
  font-weight: bold;
  text-align: left;
`;

const Logo = styled(Image)`
  width: 280px;
  margin-bottom: 5px;
`;

interface StyledGridItemProps {
  isVisible: boolean;
}

const StyledGridItem = styled(GridItem)<StyledGridItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
`;

interface StyledImgProps {
  isVisible: boolean;
}

const StyledImg = styled(Img)<StyledImgProps>`
  width: 70%;
  object-fit: cover; // 이미지가 컨테이너에 맞게 조정되도록 설정
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const cardContents = [
  {
    imageSrc: "/images/serviceImg1.svg",
  },
  {
    imageSrc: "/images/serviceImg2.svg",
  },
  {
    imageSrc: "/images/serviceImg3.svg",
  },
];

export default Section4;
