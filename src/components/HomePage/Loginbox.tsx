import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Loginbox = () => {
  return (
    <Wrapper>
      <div>
        <Button onClick={() => alert("로그인하여 이용해보세요!")}>
          로그인하여 이용해보세요!
        </Button>
      </div>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  padding: 30px;
  width: 100%;
  position: relative;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
  color: #000; /* 글자 색상 */
  background-color: #fff; /* 배경 색상 */
  border: 2px solid #a2e1db; /* 테두리 */
  border-radius: 4px; /* 모서리를 둥글게 */
  cursor: pointer; /* 커서를 손가락 모양으로 */

  &:hover {
    background-color: #f0f0f0; /* 호버 시 배경 색상 */
  }
`;
