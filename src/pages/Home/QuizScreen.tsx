import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

export const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      fetchStageData(storedToken);
    }
  }, []);

  useEffect(() => {
    if (quizData.length > 0) {
      setTimeLeft(quizData[currentQuestionIndex].stage.timeLimit);
    }
  }, [quizData, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && quizData.length > 0) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const fetchStageData = async (token: string) => {
    try {
      const response = await axios.get("https://doghae.site/stage/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response data:", response.data);
      if (response.data && Array.isArray(response.data.data)) {
        setQuizData(response.data.data);
      } else {
        console.error("Received data is not an array:", response.data);
      }
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("모든 문제를 다 푸셨습니다!");
    }
  };

  const handleChoiceClick = () => {
    handleNextQuestion();
  };

  return (
    <Container>
      {quizData.length > 0 ? (
        <>
          <QuestionHeader>문제 {currentQuestionIndex + 1}</QuestionHeader>
          <Question>{quizData[currentQuestionIndex].problem}</Question>
          <Options>
            {quizData[currentQuestionIndex].choices.map(
              (choice: string, choiceIndex: number) => (
                <Option key={choiceIndex} onClick={handleChoiceClick}>
                  {choiceIndex + 1}. {choice}
                </Option>
              )
            )}
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
