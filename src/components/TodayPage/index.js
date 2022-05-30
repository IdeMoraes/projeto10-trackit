import { useState, useContext, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import 'dayjs/locale/pt-br'



export default function TodayPage() {
  const dayjs = require('dayjs');
  const dataDeHoje = dayjs().locale('pt-br').format('dddd, DD/MM');
  const { userToken } = useContext(UserContext);
  const [habitosDeHoje, setHabitosDeHoje] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

	useEffect(() => {
    const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
    requisicao.then(resposta => {
      console.log(resposta);
      setHabitosDeHoje(resposta.data);
    });
	}, []);

  function HabitoContainer(props){
    return(
      <Habito>
        <NomeDeHabito >{props.name}</NomeDeHabito>
        <p>Sequência atual: {props.currentSequence} dias</p>
        <p>Seu recorde: {props.highestSequence} dias</p>
        <ion-icon name="checkbox" onClick={()=>{checkUncheck(props.id, props.done)}}></ion-icon>
      </Habito>
    );
  }
  function checkUncheck(id, done){
    if(done===true){
      console.log(config);
      const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, config);
      requisicao.then(resposta => {
        console.log(resposta);
      });
    }
    else{
      console.log(config);
      const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, config);
      requisicao.then(resposta => {
        console.log(resposta);
      });
    }
  }

  return (
    <TodayPageContainer>
      <Header />
      <Day>{dataDeHoje} </Day>
      <Status>Nenhum hábito concluído ainda (Chumbado)</Status>
      {habitosDeHoje.map(habito=> <HabitoContainer id={habito.id} name={habito.name} done={habito.done} currentSequence={habito.currentSequence} highestSequence={habito.highestSequence}/>)}
      <NavigationBar />
    </TodayPageContainer>
  );
}

const TodayPageContainer = styled.div`
  margin-top: 70px;
  background-color: #F2F2F2;
  min-height: 100vh;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Day = styled.div`
  width: 340px;
  padding-top: 28px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  color: #126BA5;
`;
const Status = styled.div`
  width: 340px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  color: #BABABA;
  margin-top: 5px;
  margin-bottom: 28px;
`;
const Habito = styled.div`
  width: 340px;
  min-height: 94px;
  background: #FFFFFF;
  border-radius: 5px;
  padding-top: 13px;
  padding-left: 15px;
  padding-right: 13px;
  padding-bottom: 12px;
  position: relative;
  margin-bottom: 10px;
  box-sizing: border-box;

  p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    color: #666666;
  }
  ion-icon{
    width: 69px;
    height: 69px;
    position: absolute;
    top: 13px;
    right: 13px;
    color: #EBEBEB;
  }
`;
const NomeDeHabito = styled.div`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: #666666;
  margin-bottom: 7px;
  width: 243px;
`;
