import { useState} from "react";
import styled from "styled-components";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import CreateHabitWindow from "../CreatHabitWindow";
import ShowCreatedHabits from "../ShowCreatedHabits";

export default function HabitsPage() {
  const [creatingNewHabit, setCreatingNewHabit] = useState(false);
  const [habitsListIsNotEmpty, setHabitsListIsNotEmpty] = useState(true);
  const [habitsList, setHabitsList] = useState([]);
  return (
    <HabitsPageContainer>
      <Header />
      <HabitsHeader>
        <p>Meus hábitos</p>
        <div onClick={()=>setCreatingNewHabit(true)}>+</div>
      </HabitsHeader>
      {(creatingNewHabit===true)?<CreateHabitWindow setCreatingNewHabit={setCreatingNewHabit} setHabitsList={setHabitsList} setHabitsListIsNotEmpty={setHabitsListIsNotEmpty}/>:''}
      {(habitsListIsNotEmpty===false)?<NoHabitsMessage>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabitsMessage>:''}
      <ShowCreatedHabits setHabitsListIsNotEmpty={setHabitsListIsNotEmpty} habitsList={habitsList} setHabitsList={setHabitsList}/>
      <NavigationBar />
    </HabitsPageContainer>
  );
}

const HabitsPageContainer = styled.div`
  margin-top: 70px;
  background-color: #F2F2F2;
  min-height: 100vh;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HabitsHeader = styled.div`
  width: 340px;
  padding-top: 22px;
  display: flex;
  justify-content: space-between;
  p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    color: #126BA5;
  }
  div{
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 26.976px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

  }
`;
const NoHabitsMessage = styled.div`
  width: 340px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  color: #666666;
  margin-top: 29px;
`;