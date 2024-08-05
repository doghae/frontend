import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  isVisible: boolean;
}

export const Loginbox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const REST_API_KEY = "af5896ef6b5436cd1b8d653c769c823e";
  const REDIRECT_URI = "https://doghae.vercel.app/";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
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
      <div>
        <Button isVisible={isVisible} onClick={loginHandler}>
          로그인하여 이용해보세요!
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  padding: 30px;
  width: 100%;
  position: relative;
`;

const Button = styled.button<ButtonProps>`
  height: 80px;
  padding: 10px 20px;
  margin-bottom: 220px;
  font-size: 24px;
  font-weight: bold;
  color: #000; /* 글자 색상 */
  background-color: #fff; /* 배경 색상 */
  border: 2px solid #a2e1db; /* 테두리 */
  border-radius: 10px; /* 모서리를 둥글게 */
  cursor: pointer; /* 커서를 손가락 모양으로 */
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;

  &:hover {
    background-color: #a2e1db; /* 호버 시 배경 색상 */
    color: #fff; /* 호버 시 글자 색상 */
  }
`;

export default Loginbox;
