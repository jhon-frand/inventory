import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UsuariosTemplate from './components/templatesSantiago/UsuariosTemplate';

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/usuarios' element={<UsuariosTemplate/>}/>
      </Routes>
      </BrowserRouter>    
    </>
  )
}
export default App
