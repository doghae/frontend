import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

export const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [token, setToken] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any[]>([]); // 퀴즈 데이터를 저장할 상태

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져와서 상태에 저장
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // 토큰이 있을 때 stage/1에 대한 정보를 가져오기
    if (storedToken) {
      fetchStageData(storedToken);
    }
  }, []);

  const fetchStageData = async (token: string) => {
    try {
      const response = await axios.get("https://doghae.site/stage/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response data:", response.data); // 받아온 데이터 콘솔에 출력
      if (response.data && Array.isArray(response.data.data)) {
        setQuizData(response.data.data);
      } else {
        console.error("Received data is not an array:", response.data);
      }
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  useEffect(() => {
    console.log("Quiz data updated:", quizData);
  }, [quizData]);

  return (
    <Container>
      {quizData.length > 0 ? (
        <>
          <QuestionHeader>문제 1</QuestionHeader>
          <Question>{quizData[0].problem}</Question>
          <Options>
            {quizData[0].choices.map((choice: string, choiceIndex: number) => (
              <Option key={choiceIndex}>
                {choiceIndex + 1}. {choice}
              </Option>
            ))}
          </Options>
          <Timer>
            남은 시간: {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </Timer>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Arial, sans-serif";
`;

const QuestionHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const QuizItem = styled.div`
  margin-bottom: 40px;
  width: 100%;
  max-width: 600px;
`;

const Question = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
`;

const Option = styled.button`
  background-color: #f5f5f5;
  border: none;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Timer = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: #888;
`;

export default Quiz;
