import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import {
  Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

interface ReviewItem {
  questionId: number;
  keyword: string;
  tag: string;
}

export const ReviewPage = () => {
  const { token } = useAuth();
  const [reviewData, setReviewData] = useState<ReviewItem[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (token) {
      fetchReviewData(token);
    }
  }, [token]);

  useEffect(() => {
    if (selectedQuestion) {
      setTimeLeft(selectedQuestion.stage.timeLimit);
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && selectedQuestion) {
      handleTimeOut();
    }
  }, [timeLeft]);

  const fetchReviewData = async (token: string) => {
    try {
      const response = await axios.get("https://doghae.site/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviewData(response.data.data);
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  const fetchQuestionData = async (questionId: number) => {
    try {
      const response = await axios.get(`https://doghae.site/stage/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedQuestion(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("문제 가져오기 실패", error);
    }
  };

  const handleKeywordClick = (questionId: number) => {
    fetchQuestionData(questionId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const handleCorrectAnswer = async (choice: string) => {
    const correct = selectedQuestion.answer === choice;
    if (correct) {
      try {
        await axios.delete(`https://doghae.site/reviews/${selectedQuestion.questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviewData(reviewData.filter(item => item.questionId !== selectedQuestion.questionId));
        handleModalClose();
      } catch (error) {
        console.error("정답 제출 실패", error);
      }
    } else {
      alert("오답입니다. 다시 시도하세요.");
    }
  };

  const handleTimeOut = () => {
    alert("시간 초과! 문제를 다시 풀어보세요.");
    handleModalClose();
  };

  return (
    <ReviewContainer>
      <Title>헷갈리는 단어들을 눌러 복습해봐요🦁</Title>
      <ListContainer>
        {reviewData.map(item => (
          <KeywordBox key={item.questionId} onClick={() => handleKeywordClick(item.questionId)}>
            <Text>{item.keyword}</Text>
          </KeywordBox>
        ))}
      </ListContainer>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>문제</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedQuestion && (
              <Container>
                <QuestionHeader>문제</QuestionHeader>
                <Question>{selectedQuestion.problem}</Question>
                <Options>
                  {selectedQuestion.choices.map((choice: string, index: number) => (
                    <Option key={index} onClick={() => handleCorrectAnswer(choice)}>
                      {choice}
                    </Option>
                  ))}
                </Options>
                <Timer>
                  남은 시간: {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </Timer>
              </Container>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ReviewContainer>
  );
};

const ReviewContainer = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const ListContainer = styled(Box)`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const KeywordBox = styled(Box)`
  padding: 10px;
  margin: 5px;
  background-color: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

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

export default ReviewPage;
