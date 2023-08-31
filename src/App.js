import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AddClass from './Components/AddClass';
import Header from './Components/Header';
import Regestration from './Components/Regestrations';
import Login from './Components/Login';
import Profile from './Components/Profile';


function App() {
  return (
    <div className="App">
  
  <HashRouter>

    <Header/>
    <Routes>

      <Route path='/' element={<Regestration/>} />
      <Route path='/addclass' element={<AddClass/>}/>

      
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>


    </Routes>


  </HashRouter>
    </div>
  );
}

export default App;
