import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NavigationBar(){
    return(
        <NavigationDiv>
            <Link to="/habitos"><RouteTab>Hábitos</RouteTab></Link>
            <Link to="/hoje">
                <CentralCircle>
                    <WhiteRouteTab to="/hoje">Hoje</WhiteRouteTab>
                </CentralCircle>
            </Link>
            <Link to="/historico"><RouteTab to="/"historico>Histórico</RouteTab></Link>
        </NavigationDiv>
    );
}

const NavigationDiv= styled.div`
    height: 70px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    padding-left: 33px;
    padding-right: 33px;
    bottom: 0px;
`;
const RouteTab =styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    color: #52B6FF;
`;
const CentralCircle = styled.div`
    position: absolute;
    width: 91px;
    height: 91px;
    background-color: #52B6FF;
    border-radius:50%;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;

`;
const WhiteRouteTab = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    color: white;
`;