import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'

import NotFound from './components/NotFound'
import Register from './auth/Register';
import Login from './auth/Login';
import Home from './components/Home'
import RequiredAuth from './api/RequiredAuth';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes*/}
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>

        {/*protected routes*/}
        <Route element={<RequiredAuth />}>
          <Route path='/home' element={<Home />}/>
        </Route>

        {/*Wild catch*/}
        <Route path='*' element={<NotFound />}/>
      </Route> 
    </Routes>
  );
}

export default App;
