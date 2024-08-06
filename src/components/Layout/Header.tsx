import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext"; // UserContext import
import axios from "axios";
import Modal from "./NicknameChangeModal"; // Assume you have a Modal component

export const Header: React.FC = () => {
  const REST_API_KEY = "af5896ef6b5436cd1b8d653c769c823e";
  const REDIRECT_URI = "https://doghae.vercel.app/";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const { token } = useAuth();
  const { state, dispatch } = useUser(); // UserContext 사용

  const [isModalOpen, setModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const loginHandler = () => {
    window.location.href = link;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const saveNickname = async () => {
    try {
      const response = await axios.post(
        "https://doghae.site/user/nickname",
        {
          nickname: newNickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        }
      );

      if (response.status === 204) {
        console.log("Nickname update successful"); // 상태 업데이트 로그
        dispatch({ type: "SET_NICKNAME", payload: newNickname });
        setNewNickname(""); // 입력 필드 초기화
        closeModal();
      } else {
        console.error("Failed to update nickname");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <Logo src="/images/logo.svg" />
          </Link>
        </div>
        <div>
          {token ? (
            <UserInfo>
              <UserIcon src="/images/user.svg" alt="user icon" />
              <UserName>{state.nickname} 님</UserName>
              <EditButton onClick={openModal}>수정</EditButton>
            </UserInfo>
          ) : (
            <LoginButton onClick={loginHandler}>로그인</LoginButton>
          )}
        </div>
      </Container>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>닉네임 수정</h2>
            <Input
              type="text"
              value={newNickname}
              onChange={handleNicknameChange}
              placeholder="새로운 닉네임"
            />
            <Button onClick={saveNickname}>저장</Button>
            <Button onClick={closeModal}>취소</Button>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

export const HEADER_HEIGHT = "80px";

const Wrapper = styled.header`
  z-index: 100;
  height: ${HEADER_HEIGHT};
  padding: 16px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #f5ffff;
  box-shadow: 0px 2px 18px 2px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 48px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
  align-items: center; /* 수직 가운데 정렬 */
`;

const LoginButton = styled.button`
  display: inline-block;
  width: 100px;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
  color: #000; /* 글자 색상 */
  border: 2px solid #a2e1db; /* 테두리 */
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  background-color: transparent;
  text-decoration: none;

  &:hover {
    background-color: #a2e1db; /* 호버 시 배경 색상 */
    color: #fff; /* 호버 시 글자 색상 */
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const UserName = styled.div`
  display: inline-block;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #000; /* 글자 색상 */
  text-align: center;
  line-height: 40px;
  background-color: transparent;
`;

const EditButton = styled.button`
  margin-left: 10px;
  padding: 0 10px;
  height: 35px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  background-color: #a2e1db;

  &:hover {
    transform: scale(1.05);
    background-color: #55cbcd;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #a2e1db;
  color: #fff;

  &:hover {
    background-color: #80c7be;
  }
`;

export default Header;
