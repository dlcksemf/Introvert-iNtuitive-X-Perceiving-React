import GuidePage from 'pages/GuidePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Test from 'Test';

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/test/" />} />

          <Route path="/test/" element={<Test />} />
          <Route path="/guide/" element={<GuidePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
