import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useUser } from "@/context/UserContext"; // UserContext import

export const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: number; answer: string }[]
  >([]);
  const [resultData, setResultData] = useState<any>(null);
  const [score, setScore] = useState<number>(0);
  const [timeOverQuestions, setTimeOverQuestions] = useState<number[]>([]);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);

  const { state, dispatch } = useUser(); // UserContext 사용, 닉네임 가져오기

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      const pathSegments = window.location.pathname.split("/");
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
      handleTimeOut();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isLastQuestionAnswered) {
      submitAnswers(answers);
    }
  }, [isLastQuestionAnswered]);

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
      setTimeLeft(quizData[currentQuestionIndex + 1].stage.timeLimit);
    }
  };

  const handleChoiceClick = (choice: string) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion.questionId,
        answer: choice,
      },
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex === quizData.length - 1) {
      setIsLastQuestionAnswered(true);
    } else {
      handleNextQuestion();
    }
  };

  const handleTimeOut = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion.questionId,
        answer: "시간초과",
      },
    ];
    setAnswers(newAnswers);
    setTimeOverQuestions([...timeOverQuestions, currentQuestion.questionId]);

    if (currentQuestionIndex === quizData.length - 1) {
      setIsLastQuestionAnswered(true);
    } else {
      handleNextQuestion();
    }
  };

  const submitAnswers = async (
    finalAnswers: { questionId: number; answer: string }[]
  ) => {
    const pathSegments = window.location.pathname.split("/");
    const quizId = pathSegments[pathSegments.length - 1]; // URL의 마지막 부분을 가져옴

    try {
      const response = await axios.post(
        `https://doghae.site/stage/${quizId}`,
        {
          answers: finalAnswers,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        }
      );
      console.log("Submission result:", response.data);
      calculateScore(response.data.data);
      setResultData(response.data); // 결과 데이터를 상태에 저장
    } catch (error) {
      console.error("정답 제출 실패", error);
    }
  };

  const calculateScore = (results: any[]) => {
    const correctAnswers = results.filter((result) => result.answer).length;
    const totalQuestions = results.length;
    const score = (correctAnswers / totalQuestions) * 100;
    setScore(score);
  };

  if (resultData) {
    const correctAnswers = resultData.data.filter(
      (result: any) => result.answer
    ).length;
    const incorrectAnswers = resultData.data.filter(
      (result: any) => !result.answer
    ).length;

    return (
      <ResultContainer>
        <BigHeader>수고하셨습니다 😊</BigHeader>
        <ResultBox>
          {token && <UserName>{state.nickname} 님의 점수는</UserName>}
          <ResultDetail>
            맞은 개수: {correctAnswers}개<br />
            틀린 개수: {incorrectAnswers}개
          </ResultDetail>
          <Score>{Math.round(score)}점 입니다!</Score>
          <MainButton onClick={() => (window.location.href = "/")}>
            메인으로
          </MainButton>
        </ResultBox>
      </ResultContainer>
    );
  }

  return (
    <Container>
      {quizData.length > 0 ? (
        <>
          <QuestionHeader>문제 {currentQuestionIndex + 1}</QuestionHeader>
          <Question>{quizData[currentQuestionIndex].problem}</Question>
          <Options>
            {quizData[currentQuestionIndex].choices.map(
              (choice: string, choiceIndex: number) => (
                <Option
                  key={choiceIndex}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={timeOverQuestions.includes(
                    quizData[currentQuestionIndex].questionId
                  )}
                >
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

const Option = styled.button<{ disabled?: boolean }>`
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
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const Timer = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: #888;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Arial, sans-serif";
`;

const ResultBox = styled.div`
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ResultDetail = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Score = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #00bcd4;
  margin-bottom: 20px;
`;

const MainButton = styled.button`
  background-color: #00bcd4;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0097a7;
  }
`;

const BigHeader = styled.h1`
  font-size: 30px; /* 원하는 크기로 설정 */
  font-weight: bold;
  margin-bottom: 20px;
`;

export default Quiz;
