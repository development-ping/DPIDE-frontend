import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/MainPage/Main';
import Ide from './pages/IDEPage/Ide';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import MyPage from './pages/MyPagePage/MyPage';
import StartPage from './pages/StartPage/StartPage';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { RecoilRoot } from 'recoil';
import Invite from './pages/Invite/Invite';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/ide/:projectId" element={<Ide />} />
          <Route path="/ide/invite/:projectId" element={<Invite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
