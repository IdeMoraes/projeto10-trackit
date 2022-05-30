import { useState, useContext, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function ShowCreatedHabits(props){
    const habitsList = props.habitsList;
    const setHabitsList = props.setHabitsList
    const setHabitsListIsNotEmpty = props.setHabitsListIsNotEmpty;

    const { userToken } = useContext(UserContext);
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    useEffect(() => {
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        requisicao.then(answer => {
            console.log(answer);
            if(!answer.data.length>=1){props.setHabitsListIsNotEmpty(false)}
            setHabitsList(answer.data);
        });
	}, []);
    return(
      <Habits>
      {habitsList.map(habit=> <HabitFunction id={habit.id} name={habit.name} days={habit.days} setHabitsList={setHabitsList} setHabitsListIsNotEmpty={setHabitsListIsNotEmpty}/>)}
      </Habits>
    );
}
function HabitFunction(props){
    const { userToken } = useContext(UserContext);
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    function deletarHabito(id){
      if (window.confirm("Você realmente quer deletar esse hábito?")) {
        const requisicao = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        requisicao.then(answer => {
          const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
          requisicao.then(answer => {
              if(!answer.data.length>=1){props.setHabitsListIsNotEmpty(false)}
              props.setHabitsList(answer.data);
          });
        });
      }
    }
    return(
      <Habit>
        <HabitName>{props.name}</HabitName>
        <WeekDays>
          {(props.days.includes(1)===true)?<WeekDay className="selected">S</WeekDay>:<WeekDay>S</WeekDay>}
          {(props.days.includes(2)===true)?<WeekDay className="selected">T</WeekDay>:<WeekDay>T</WeekDay>}
          {(props.days.includes(3)===true)?<WeekDay className="selected">Q</WeekDay>:<WeekDay>Q</WeekDay>}
          {(props.days.includes(4)===true)?<WeekDay className="selected">Q</WeekDay>:<WeekDay>Q</WeekDay>}
          {(props.days.includes(5)===true)?<WeekDay className="selected">S</WeekDay>:<WeekDay>S</WeekDay>}
          {(props.days.includes(6)===true)?<WeekDay className="selected">S</WeekDay>:<WeekDay>S</WeekDay>}
          {(props.days.includes(7)===true)?<WeekDay className="selected">D</WeekDay>:<WeekDay>D</WeekDay>}
        </WeekDays>
        <ion-icon name="trash-outline" onClick={()=>{deletarHabito(props.id);}}></ion-icon>
      </Habit>);
}

const Habits =styled.div`
`;
const Habit= styled.div`
width: 340px;
background-color: #FFFFFF;
border-radius: 5px;
padding-left: 19px;
margin-top: 20px;
padding-bottom: 15px;
position: relative;
ion-icon{
  position: absolute;

  top: 11px;
  right: 10px;
  width: 13px; 
  height: 15px;
  color: #666666;
}
`;
const HabitName = styled.div`
  width: 303px;
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: #666666;
  margin-top: 13px;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
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
  &.selected{
    background-color: #CFCFCF;
    color: #FFFFFF;
  }
`;