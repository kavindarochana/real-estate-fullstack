import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Header from './components/Header';

const App = () => {
  return (
   <BrowserRouter>
   <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/logout' element={<Logout />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/profile' element={<Profile />}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;