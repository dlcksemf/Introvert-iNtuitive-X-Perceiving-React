import { Routes, Route, Navigate } from 'react-router-dom';
import Test from 'Test';

function App() {
  return (
    <>
      <div className="app">
        <TopNav />
        <Routes>
          <Route path="/" element={<Navigate to="/test/" />} />

          <Route path="/test/" element={<Test />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
