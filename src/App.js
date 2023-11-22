import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Component/HomePage/HomePage';
import ImagePanel from './Component/Panel/Panel2';

function App() {
  return (
    <Router>
      <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/comic" element={<ImagePanel/>}/>
      </Routes>

    </Router>
   
  );
}

export default App;
