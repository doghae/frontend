import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <Logo src="/images/logo.svg" />
          </Link>
        </div>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = "80px";

const Wrapper = styled.header`
  z-index: 100;
  height: ${HEADER_HEIGHT};
  padding: 16px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #f5ffff;
  box-shadow: 0px 2px 18px 2px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 48px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
`;
