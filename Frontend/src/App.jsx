import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
<<<<<<< HEAD
import Actividades from './components/organismos/templates_alexander/actividades';
import Tecnicos from './components/organismos/templates_alexander/tecnicos';
=======
import UsuariosTemplate from './components/templatesSantiago/UsuariosTemplate';
import EquiposTemplate from './components/templates/EquiposTemplate';
import CategoriasTemplate from './components/templates/CategoriasTemplate';
import UbicacionesTemplate from './components/templates/UbicacionesTemplate';
import PruebasTemplate from './components/templates/PruebasTemplate';
import UnidadesTemplate from './components/templates/UnidadesTemplate';
>>>>>>> a42d72e795b019f675e0ef10ef1f45bf5af6f728

function App() {
  
  return (
    <>
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/tecnicos' element={<Tecnicos/>}/>
        <Route path='/actividades' element={<Actividades/>}/>
      </Routes>
    </BrowserRouter>
=======
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Dashboard/>}/>
       <Route path='/usuarios' element={<UsuariosTemplate/>}/> 
      <Route path='/equipos' element={<EquiposTemplate/>}/>
      <Route path='/categorias' element={<CategoriasTemplate/>}/>
      <Route path='/ubicaciones' element={<UbicacionesTemplate/>}/>
      <Route path='/pruebas' element={<PruebasTemplate/>}/>
      <Route path='/unidades' element={<UnidadesTemplate/>}/>
       </Routes>
       </BrowserRouter>
>>>>>>> a42d72e795b019f675e0ef10ef1f45bf5af6f728
    </>
  )
}
export default App