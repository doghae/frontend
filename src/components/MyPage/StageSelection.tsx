import styled from "@emotion/styled";
import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const stages = Array.from({ length: 16 }, (_, i) => i + 1);

export const StageSelection = () => {
  const navigate = useNavigate();

  const handleCardClick = (stage: number) => {
    navigate(`/quiz/${stage}`);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Header>
          <StageTitle>Stage</StageTitle>
          <Subtitle>※ 단계를 선택해서 문제를 풀어보세요!</Subtitle>
        </Header>
        <CardContainer>
          {stages.map(stage => (
            <StageCard key={stage} onClick={() => handleCardClick(stage)}>
              {stage}
            </StageCard>
          ))}
        </CardContainer>
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

const Header = styled(Flex)`
  align-items: baseline;
  margin-bottom: 20px;
`;

const StageTitle = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  color: #000;
`;

const Subtitle = styled(Text)`
  font-size: 24px;
  color: #c927f6;
  margin-left: 10px;
`;

const CardContainer = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
`;

const StageCard = styled(GridItem)`
  background: linear-gradient(180deg, #55cbcd 0%, #a2e1db 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-style: italic;
  color: white;
  height: 100px;
  cursor: pointer;  /* 추가된 스타일 */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default StageSelection;
