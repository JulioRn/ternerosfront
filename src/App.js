
import './App.css';

import {BrowserRouter, Route, Routes } from 'react-router-dom';

import IniciarSesion from './componentes/IniciarSesion'
import MenuPrincipal from './componentes/MenuPrincipal'
import GestionUsuarios from './componentes/GestionUsuarios'


function App() {

  return (
    <>
    
      <BrowserRouter>

      <Routes>
        <Route path='/' element={<IniciarSesion />}></Route>
      </Routes>
     

      <Routes >
      
        <Route path='/MenuPrincipal' element={<MenuPrincipal />}></Route>
      </Routes>
      <Routes>
        <Route path='/GestionU' element={<GestionUsuarios />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

