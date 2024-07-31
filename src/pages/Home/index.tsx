import { Contents } from "@/components/HomePage/Contents";
import styled from "@emotion/styled";

export const HomePage = () => {
  return (
    <Wrapper>
      <Contents />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #E8FFFF 0%, #ffffff 100%);
  overflow-x: hidden;
`;
