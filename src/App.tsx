import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Search from './Search';
import Gallery from './Gallery';
import DetailView from './Detail';

function App() {
  const navigate = useNavigate();
  const handleViewChange = (view: string) => {
    navigate(view === 'Search' ? '/' : '/gallery');
  };

  return (
    <>
      <Navbar onViewChange={handleViewChange} />
      <Routes>
        <Route path="/" element={<Search/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/detail" element={<DetailView />} /> 
      </Routes>
    </>
  );
}

export default App;

