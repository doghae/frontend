import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 30px;
  width: 100%;
  position: relative;
`;

export const TitleContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 48px; /* 원하는 크기로 설정 */
  font-weight: bold; /* 원하는 스타일로 설정 */
  display: inline-block;
  position: relative;
  width: fit-content;
`;

export const Logo = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px; /* 이미지의 높이를 적절히 설정 */
  cursor: pointer;
  bottom: -5px; /* 글자와 이미지 사이의 간격 조정 */
`;

export const Text = styled.p`
  font-size: 20px; /* 원하는 크기로 설정 */
  margin-top: 10px;
  margin-bottom: 8px; /* 다른 요소와의 간격 설정 */
`;
