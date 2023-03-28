import './App.css';
import { Routes, Route } from 'react-router-dom';
import Lists from './components/Lists';
import SpecificList from './components/SpecificList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Lists />}/>
      <Route path='/list' element={<Lists />}/>
      <Route path='/list/:id' element={<SpecificList />}/>
    </Routes>
  );
}

export default App;
