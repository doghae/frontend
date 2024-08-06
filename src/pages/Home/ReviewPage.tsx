import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

interface ReviewItem {
  questionId: number;
  keyword: string;
  tag: string;
}

export const ReviewPage = () => {
  const { token } = useAuth();
  const [reviewData, setReviewData] = useState<ReviewItem[]>([]);

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

  return (
    <ReviewContainer>
      <Title>헷갈리는 단어들을 눌러 복습해봐요🦁</Title>
      <ListContainer>
        {reviewData.map(item => (
          <KeywordBox key={item.questionId}>
            <Text>{item.keyword}</Text>
          </KeywordBox>
        ))}
      </ListContainer>
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
  margin-top: 50px;
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

export default ReviewPage;
