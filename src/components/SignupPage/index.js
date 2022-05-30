import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import logomark from "../../assets/logomark.png";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const [disabled, setDisabled] = useState(false);

  function signupRequest() {
    setIsLoading("loading");
    setDisabled(true);
    const signupData = {
      email: email,
      name: name,
      image: image,
      password: password
    };
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      signupData
    );
    request.then((success) => {
      setIsLoading("");
      setDisabled(false);
      navigate("/");
    });
    request.catch((problem) => {
      setIsLoading("");
      setDisabled(false);
      alert(`Ocorreu uma falha no cadastro. ${problem.response.data.message}`);
    });
  }
  return (
    <SingupPageContainer>
      <LogomarkImage src={logomark} alt="logomark" />
      <Logotype>TrackIt</Logotype>
      <Input
        className={isLoading}
        disabled={disabled}
        type="email"
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        className={isLoading}
        disabled={disabled}
        type="password"
        placeholder="senha"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Input
        className={isLoading}
        disabled={disabled}
        type="text"
        placeholder="nome"
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        className={isLoading}
        disabled={disabled}
        type="url"
        placeholder="foto"
        onChange={(event) => setImage(event.target.value)}
      />
      <Button className={isLoading} disabled={disabled} onClick={() => signupRequest()}>
        Cadastrar
      </Button>
      <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
    </SingupPageContainer>
  );
}

const SingupPageContainer = styled.div`
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
