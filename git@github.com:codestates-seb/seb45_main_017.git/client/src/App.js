import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main';

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route />
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App;
