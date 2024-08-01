import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Checkbox,
  Text as ChakraText,
  Image,
  Flex,
} from "@chakra-ui/react";

interface AnswerBoxProps {
  revealed: boolean;
}

interface ListItemProps {
  isVisible: boolean;
}

const questions = [
  "대관절",
  "울씨년스럽다",
  "시나브로",
  "개편하다",
  "오금",
  "샌님",
  "미덥다",
];

const answers = [
  "도대체",
  "불안하고 서늘하다",
  "모르는 사이에 조금씩",
  "고치고 바꾸다",
  "무릎의 뒷부분",
  "여리고 부드러운 사람",
  "믿음직하다",
];

export const Section1 = () => {
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const handleReveal = (index: number) => {
    const newRevealed = [...revealed];
    newRevealed[index] = !newRevealed[index]; // 토글 기능
    setRevealed(newRevealed);
  };

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
          <Title>점점 낮아지는 문해력...🫠</Title>
          <Logo src="/images/underline.svg" />
        </TitleContainer>
        <Text>
          여러분은 아래의 단어들 중 정확한 뜻을 몇 개나 알고 계신가요?
        </Text>
        <Text>
          세 단어 이상 뜻을 알고 있다면 평균 정도의 어휘력 수준입니다.
        </Text>
        <br />
        {questions.map((question, index) => (
          <ListItem key={index} isVisible={isVisible}>
            <StyledCheckbox />
            <ChakraText>{question}</ChakraText>
            <AnswerBox
              revealed={revealed[index]}
              onClick={() => handleReveal(index)}
            >
              {revealed[index] ? answers[index] : "클릭하여 정답확인"}
            </AnswerBox>
          </ListItem>
        ))}
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
  margin-top: 50px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
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
  width: 460px;
  margin-bottom: 5px;
`;

const Text = styled(ChakraText)`
  font-size: 26px;
  color: #333;
  margin-bottom: 5px;
  margin-left: 10px;
  text-align: left;
`;

const ListItem = styled(Box)<ListItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #cce7ff;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;

  &:last-of-type {
    border-bottom: none;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

const AnswerBox = styled(Box)<AnswerBoxProps>`
  background-color: ${(props) => (props.revealed ? "lightblue" : "#e0e0e0")};
  color: ${(props) => (props.revealed ? "blue" : "black")};
  user-select: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  width: 200px;
`;

export default Section1;
