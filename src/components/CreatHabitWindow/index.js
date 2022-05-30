import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function CreateHabitWindow(props){
    const setHabitsListIsNotEmpty= props.setHabitsListIsNotEmpty;
    const setHabitsList = props.setHabitsList
    const [isDay1Selected, setIsDay1Selected] = useState('');
    const [isDay2Selected, setIsDay2Selected] = useState('');
    const [isDay3Selected, setIsDay3Selected] = useState('');
    const [isDay4Selected, setIsDay4Selected] = useState('');
    const [isDay5Selected, setIsDay5Selected] = useState('');
    const [isDay6Selected, setIsDay6Selected] = useState('');
    const [isDay7Selected, setIsDay7Selected] = useState('');
    const { userToken } = useContext(UserContext);
    const [name, setName]=useState("");
    const [days, setDays] =useState([]);
    const [disabled, setDisabled] = useState(false);
    const body = {
      name: name,
      days: days
    };
    function chooseDay(num){
      if(!days.includes(num)){
        setDays([...days,num]);
      }
    }
    function saveNewHabit(){
        setDisabled(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
      const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
      request.then((success)=>{
          props.setCreatingNewHabit(false);
          props.setHabitsListIsNotEmpty(true);
          const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
          requisicao.then(answer => {
              props.setHabitsList(answer.data);});
            setDisabled(false);
    });
      request.catch((problem)=>{console.log(problem); alert('Houve um problema e esse hábito não foi criado. Tente novamente.');setDisabled(false)});
    }
    return(
      <CreateHabit>
        <HabitName disabled={disabled} placeholder="nome do hábito" onChange={(event)=>setName(event.target.value)}/>
        <WeekDays>
          <WeekDay disabled={disabled} onClick={()=>{chooseDay(1);setIsDay1Selected('newHabitDaySelected')}} className={isDay1Selected}>S</WeekDay>
          <WeekDay disabled={disabled} onClick={()=>{chooseDay(2);setIsDay2Selected('newHabitDaySelected')}} className={isDay2Selected}>T</WeekDay>
          <WeekDay disabled={disabled} onClick={()=>{chooseDay(3);setIsDay3Selected('newHabitDaySelected')}} className={isDay3Selected}>Q</WeekDay>
          <WeekDay disabled={disabled} onClick={()=>{chooseDay(4);setIsDay4Selected('newHabitDaySelected')}} className={isDay4Selected}>Q</WeekDay>
          <WeekDay disabled={disabled} onClick={()=>{chooseDay(5);setIsDay5Selected('newHabitDaySelected')}} className={isDay5Selected}>S</WeekDay>
          <WeekDay disabled={disabled} onClick={()=>{chooseDay(6);setIsDay6Selected('newHabitDaySelected')}} className={isDay6Selected}>S</WeekDay>
          <WeekDay disabled={disabled} onClick={()=>{chooseDay(7);setIsDay7Selected('newHabitDaySelected')}} className={isDay7Selected}>D</WeekDay>
        </WeekDays>
        <Buttons>
          <CancelButton disabled={disabled} onClick={()=>props.setCreatingNewHabit(false)}>Cancelar</CancelButton>
          <SaveButton disabled={disabled} onClick={()=>saveNewHabit()}>Salvar</SaveButton>
        </Buttons>
      </CreateHabit>
    );
  }
  const CreateHabit= styled.div`
  width: 340px;
  height: 180px;
  background-color: #FFFFFF;
  border-radius: 5px;
  padding-left: 19px;
  margin-top: 20px;
`;
const HabitName = styled.input`
  width: 303px;
  height: 45px;
  background-color: #FFFFFF;
  border: 1px solid #D5D5D5;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: #666666;
  margin-top: 18px;
  margin-bottom: 8px;
  ::placeholder{
    color: #DBDBDB;
  }
`;
const WeekDays = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const WeekDay =styled.div`
  width: 30px;
  height: 30px;
  background-color: #FFFFFF;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: #DBDBDB;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  &.newHabitDaySelected{
    background-color: #CFCFCF;
    color: #FFFFFF;
  }
`;
const Buttons = styled.div`
  display: flex;
  margin-top: 29px;
  align-items: center;
  justify-content: right;
  padding-right: 16px;
`;
const CancelButton=styled.div`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  color: #52B6FF;
`;
const SaveButton = styled.div`
  width: 84px;
  height: 35px;
  background-color: #52B6FF;
  border-radius: 4.63636px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 23px;
`;