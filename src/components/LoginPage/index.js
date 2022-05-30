import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import logomark from "../../assets/logomark.png";

export default function LoginPage() {
  const {
    setUserId,
    setUserName,
    setUserImage,
    setUserEmail,
    setUserPassword,
    setUserToken
  } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  function loginRequest() {
    setIsLoading("loading");
    const loginData = {
      email: email,
      password: password
    };
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      loginData
    );
    request.then((answer) => {
      setUserId(answer.data.id);
      setUserName(answer.data.name);
      setUserImage(answer.data.image);
      setUserEmail(answer.data.email);
      setUserPassword(answer.data.password);
      setUserToken(answer.data.token);
      setIsLoading("");
      navigate("/hoje");
    });
    request.catch((problem) => {
      setIsLoading("");
      alert(`Ocorreu uma falha no login. ${problem.response.data.message}`);
    });
  }
  return (
    <LoginPageContainer>
      <LogomarkImage src={logomark} alt="logomark" />
      <Logotype>TrackIt</Logotype>
      <Input
        className={isLoading}
        type="email"
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        className={isLoading}
        type="password"
        placeholder="senha"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button className={isLoading} onClick={() => loginRequest()}>
        Entrar
      </Button>
      <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  padding-top: 68px;
`;
const LogomarkImage = styled.img`
  width: 180px;
`;
const Logotype = styled.div`
  font-family: "Playball", cursive;
  font-style: normal;
  font-size: 68.982px;
  color: #126ba5;
  margin-bottom: 32.62px;
`;
const Input = styled.input`
  width: 303px;
  height: 45px;
  font-size: 19.976px;
  padding-left: 11px;
  margin-bottom: 6px;
  &.loading {
    background-color: #f2f2f2;
    color: #afafaf;
  }
`;
const Button = styled.button`
  background: #52b6ff;
  width: 303px;
  height: 45px;
  background-color: #52b6ff;
  border-radius: 4.63636px;
  font-size: 20.976px;
  color: white;
  margin-bottom: 25px;
  &.loading {
    opacity: 0.7;
  }
`;
const StyledLink = styled(Link)`
  font-family: "Lexend Deca", sans-serif;
  font-size: 13.976px;
  color: #52b6ff;
`;
