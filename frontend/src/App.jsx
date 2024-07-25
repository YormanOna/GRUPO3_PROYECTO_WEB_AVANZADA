import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home}from './pages/home';
import {Login} from './pages/login';
import {Registro} from './pages/client/registro';
import {AdminHome} from './pages/admin/adminHome';
import {Index} from './pages/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/home" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;