import { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import ProgressContext from "../../contexts/ProgressContext";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import "dayjs/locale/pt-br";

export default function TodayPage() {
  const dayjs = require("dayjs");
  const dataDeHoje = dayjs().locale("pt-br").format("dddd, DD/MM");
  const { userToken } = useContext(UserContext);
  const {porcentagem, setPorcentagem} = useContext(ProgressContext);
  const [habitosDeHoje, setHabitosDeHoje] = useState([]);
  let doneOrNotList = habitosDeHoje.map((habito) => {
    return String(habito.done);
  });
  let doneList = doneOrNotList.filter((item) => {
    return item === "true";
  });
  let doneNumberList = doneList.length;
  setPorcentagem(((doneNumberList / habitosDeHoje.length) * 100).toFixed(0));
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  };
  useEffect(() => {
    const requisicao = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    requisicao.then((resposta) => {
      setHabitosDeHoje(resposta.data);
    });
  }, []);
  function HabitoContainer(props) {
    let cor = "";
    if (props.done === true) {
      cor = "#8FC549";
    } else {
      cor = "#EBEBEB";
    }
    return (
      <Habito>
        <NomeDeHabito>{props.name}</NomeDeHabito>
        {props.done === true ? (
          <p className="green">Sequência atual: {props.currentSequence} dias</p>
        ) : (
          <p>Sequência atual: {props.currentSequence} dias</p>
        )}
        {props.currentSequence === props.highestSequence &&
        props.highestSequence > 0 ? (
          <p className="green">Seu recorde: {props.highestSequence} dias</p>
        ) : (
          <p>Seu recorde: {props.highestSequence} dias</p>
        )}
        <ion-icon
          style={{ color: cor }}
          id="checked"
          name="checkbox"
          onClick={() => {
            checkUncheck(props.id, props.done);
          }}
        ></ion-icon>
      </Habito>
    );
  }
  function checkUncheck(id, done) {
    if (done === true) {
      const requisicao = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
        {},
        config
      );
      requisicao.then((resposta) => {
        const requisicao = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
          config
        );
        requisicao.then((resposta) => {
          setHabitosDeHoje(resposta.data);
        });
      });
    } else {
      const requisicao = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        {},
        config
      );
      requisicao.then((resposta) => {
        const requisicao = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
          config
        );
        requisicao.then((resposta) => {
          setHabitosDeHoje(resposta.data);
        });
      });
    }
  }
  return (
    <TodayPageContainer>
      <Header />
      <Day>{dataDeHoje} </Day>
      {porcentagem > 0 ? (
        <Status className="green">{porcentagem}% dos hábitos concluídos</Status>
      ) : (
        <Status>Nenhum hábito concluído ainda</Status>
      )}
      {habitosDeHoje.map((habito) => (
        <HabitoContainer
          id={habito.id}
          name={habito.name}
          done={habito.done}
          currentSequence={habito.currentSequence}
          highestSequence={habito.highestSequence}
        />
      ))}
      <NavigationBar />
    </TodayPageContainer>
  );
}

const TodayPageContainer = styled.div`
  margin-top: 70px;
  background-color: #f2f2f2;
  min-height: 100vh;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Day = styled.div`
  width: 340px;
  padding-top: 28px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  color: #126ba5;
`;
const Status = styled.div`
  width: 340px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  color: #bababa;
  margin-top: 5px;
  margin-bottom: 28px;
  &.green {
    color: #8fc549;
  }
`;
const Habito = styled.div`
  width: 340px;
  min-height: 94px;
  background: #ffffff;
  border-radius: 5px;
  padding-top: 13px;
  padding-left: 15px;
  padding-right: 13px;
  padding-bottom: 12px;
  position: relative;
  margin-bottom: 10px;
  box-sizing: border-box;

  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    color: #666666;
    &.green {
      color: #8fc549;
    }
  }
  ion-icon {
    width: 69px;
    height: 69px;
    position: absolute;
    top: 13px;
    right: 13px;
  }
`;
const NomeDeHabito = styled.div`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: #666666;
  margin-bottom: 7px;
  width: 243px;
`;
