import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function Header() {
  const { userImage } = useContext(UserContext);
  return (
    <HeaderDiv>
      <Logotype>TrackIt</Logotype>
      <img
        src = {userImage}
        alt="profile"
      />
    </HeaderDiv>
  );
}

const HeaderDiv = styled.div`
  height: 70px;
  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index:1;
  img {
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
  }
`;
const Logotype = styled.div`
  font-family: "Playball";
  font-style: normal;
  font-weight: 400;
  font-size: 38.982px;
  color: #ffffff;
`;
