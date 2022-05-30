import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import TodayPage from "./components/TodayPage";
import HabitsPage from "./components/HabitsPage";
import HistoryPage from "./components/HistoryPage";
import UserContext from "./contexts/UserContext";


export default function App() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userToken, setUserToken] = useState('');
    return (
        <UserContext.Provider value={{userId, setUserId, userName, setUserName, userImage, setUserImage, userEmail, setUserEmail, userPassword, setUserPassword, userToken, setUserToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/cadastro" element={<SignupPage />} />
                    <Route path="/hoje" element={<TodayPage />} />
                    <Route path="/habitos" element={<HabitsPage />} />
                    <Route path="/historico" element={<HistoryPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
  );
}