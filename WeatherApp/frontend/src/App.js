
import './App.css';
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { useContext, useState } from 'react';
import ListResults from './components/ListResults';
import AuthContext from './contexts/AuthContext';
import About from './components/About';

function App() {
  let [search, setSearch] = useState('')
  let {results} = useContext(AuthContext)

  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="" element={<About></About>}/>
        <Route path="entry" element={<PrivateRoute><Home search={search} setSearch={setSearch}/></PrivateRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/results" element={<ListResults results={results}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
