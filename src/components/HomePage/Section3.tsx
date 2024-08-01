import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { Wrapper, Logo, Title, Text, TitleContainer } from "./SectionStyle";

export const Section3 = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>
          어휘 = 요리의 재료 😉
          <Logo src="/images/underline1.svg" />
        </Title>
      </TitleContainer>
      <Text>어휘는 마치 요리의 재료와도 비슷합니다.</Text>
      <Text>
        다양한 요리 재료를 적절하게 사용해서 우리의 입을 즐겁게 해준다면,{" "}
      </Text>
      <Text>
        다양한 어휘는 원활한 대화를 통해 상대방과 깊은 소통을 할 수 있는
      </Text>
      <Text>기회와 기쁨을 안겨줍니다. </Text>
    </Wrapper>
  );
};
