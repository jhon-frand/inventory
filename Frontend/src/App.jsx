import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Actividades from './components/organismos/templates_alexander/actividades';
import Tecnicos from './components/organismos/templates_alexander/tecnicos';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/tecnicos' element={<Tecnicos/>}/>
        <Route path='/actividades' element={<Actividades/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App