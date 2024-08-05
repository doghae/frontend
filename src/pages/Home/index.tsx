import { Contents } from "@/components/HomePage/Contents";
import { Main } from "@/components/MyPage/Main";
import { useAuth } from "@/context/AuthContext";
import styled from "@emotion/styled";

export const HomePage = () => {
  const { token } = useAuth();

  return <Wrapper>{token ? <Main /> : <Contents />}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #e8ffff 0%, #ffffff 100%);
  overflow-x: hidden;
`;

export default HomePage;
