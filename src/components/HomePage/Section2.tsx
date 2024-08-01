import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { Wrapper, Logo, Title, Text, TitleContainer } from "./SectionStyle";

export const Section2 = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>
          요즘 쓰지도 않는 표현 그렇게 중요해?🤔
          <Logo src="/images/underline1.svg" />
        </Title>
      </TitleContainer>
      <Text>
        세대 간 차이가 있기 때문에 모르는 표현이 있는 것은 당연합니다.
      </Text>
      <Text>하지만 살아가다 보면 다양한 사람들을 만나게 되고, </Text>
      <Text>
        대화를 할 때 모르는 단어나 표현으로 인해 답답한 경우도 많이 생깁니다.
      </Text>
    </Wrapper>
  );
};
