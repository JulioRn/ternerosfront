
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import IniciarSesion from './componentes/IniciarSesion'
import MenuPrincipal from './componentes/MenuPrincipal'
import GestionUsuarios from './componentes/GestionUsuarios'
import GestionEnfermedades from './componentes/GestionEnfermedades'
import GestionAlimentos from './componentes/GestionAlimentos'
import GestionGuacheras from './componentes/GestionGuacheras'
import GestionTerneros from './componentes/GestionTerneros'
import Graficas from './componentes/Graficas'



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

        <Routes >

<Route path='/Graficas' element={<Graficas />}></Route>
</Routes>

        <Routes>
          <Route path='/GestionU' element={<GestionUsuarios />}></Route>
        </Routes>

        <Routes>
          <Route path='/GestionT' element={<GestionTerneros />}></Route>
        </Routes>

        <Routes>
          <Route path='/GestionG' element={<GestionGuacheras />}></Route>
          </Routes>

          <Routes>
            <Route path='/GestionA' element={<GestionAlimentos />}></Route>
          </Routes>

          <Routes>
            <Route path='/GestionE' element={<GestionEnfermedades />}></Route>
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

