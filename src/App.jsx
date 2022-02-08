import GuidePage from 'pages/GuidePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Test from 'Test';

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/test/" />} />

          <Route path="/test/" element={<Test />} />
          <Route path="/accounts/login/" element={<LoginPage />} />
          <Route path="/accounts/signup/" element={<SignupPage />} />
          <Route path="/guide/" element={<GuidePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
