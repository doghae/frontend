import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
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

  useEffect(() => {
    if (token) {
      fetchReviewData(token);
    }
  }, [token]);

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
      const response = await axios.get(`https://doghae.site/questions/${questionId}`, {
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

  const handleCorrectAnswer = async () => {
    // 여기에 정답 제출 후 삭제하는 로직을 추가합니다.
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
  };

  return (
    <ReviewContainer>
      {reviewData.map(item => (
        <KeywordBox key={item.questionId} onClick={() => handleKeywordClick(item.questionId)}>
          <Text>{item.keyword}</Text>
        </KeywordBox>
      ))}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>문제</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedQuestion && (
              <div>
                <Text>{selectedQuestion.problem}</Text>
                {selectedQuestion.choices.map((choice: string, index: number) => (
                  <Button key={index} onClick={() => handleCorrectAnswer()}>{choice}</Button>
                ))}
              </div>
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

export default ReviewPage;
