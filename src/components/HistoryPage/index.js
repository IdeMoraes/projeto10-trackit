import styled from "styled-components";
import Header from "../Header";
import NavigationBar from "../NavigationBar";

export default function HistoryPage(){
    return (
        <HistoryPageContainer>
          <Header />
          <HistoryHeader>Histórico</HistoryHeader>
          <ComingSoon>
              Em breve você poderá ver o histórico dos seus hábitos aqui!
          </ComingSoon>
          <NavigationBar/>
        </HistoryPageContainer>
    );
}

const HistoryPageContainer = styled.div`
    margin-top: 70px;
    background-color: #F2F2F2;
    min-height: 100vh;
    margin-bottom: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const HistoryHeader = styled.div`
    width: 340px;
    padding-top: 28px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    color: #126BA5;
`;
const ComingSoon = styled.div`
    width: 340px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    color: #666666;
    margin-top: 17px;
`;