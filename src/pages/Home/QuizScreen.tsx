import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

export const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; answer: string }[]>([]);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      const pathSegments = window.location.pathname.split('/');
      const quizId = pathSegments[pathSegments.length - 1]; // URL의 마지막 부분을 가져옴
      fetchStageData(storedToken, quizId);
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

  const fetchStageData = async (token: string, quizId: string) => {
    try {
      const response = await axios.get(`https://doghae.site/stage/${quizId}`, {
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
      submitAnswers();
    }
  };

  const handleChoiceClick = (choice: string) => {
    const currentQuestion = quizData[currentQuestionIndex];
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: currentQuestion.questionId,
        answer: choice,
      },
    ]);
    handleNextQuestion();
  };

  const submitAnswers = async () => {
    const pathSegments = window.location.pathname.split('/');
    const quizId = pathSegments[pathSegments.length - 1]; // URL의 마지막 부분을 가져옴

    try {
      const response = await axios.post(`https://doghae.site/stage/${quizId}`, {
        answers: answers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Submission result:", response.data);
      setResultData(response.data); // 결과 데이터를 상태에 저장
    } catch (error) {
      console.error("정답 제출 실패", error);
    }
  };

  if (resultData) {
    return (
      <Container>
        <ResultHeader>결과</ResultHeader>
        {resultData.data.map((result: any, index: number) => (
          <ResultItem key={index} correct={result.answer}>
            문제 {result.questionId}: {result.answer ? '맞았습니다!' : '틀렸습니다.'}
          </ResultItem>
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {quizData.length > 0 ? (
        <>
          <QuestionHeader>문제 {currentQuestionIndex + 1}</QuestionHeader>
          <Question>{quizData[currentQuestionIndex].problem}</Question>
          <Options>
            {quizData[currentQuestionIndex].choices.map((choice: string, choiceIndex: number) => (
              <Option key={choiceIndex} onClick={() => handleChoiceClick(choice)}>
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

const ResultHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ResultItem = styled.div<{ correct: boolean }>`
  margin-bottom: 10px;
  color: ${props => (props.correct ? 'green' : 'red')};
`;

export default Quiz;
