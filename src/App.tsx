import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './contexts/authContext';
import { UserProvider } from './contexts/userContext';
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound';
import { Descobrir } from './pages/Descobrir';
import { Campanha } from './pages/Campanha';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';

import './styles/main.scss'
import { CriacaoCampanha } from './pages/CadastroCampanha';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/descobrir' element={<Descobrir />} />
            <Route path='/campanhas/:_id' element={<Campanha />} />
            <Route path='/campanhas/criar' element={<CriacaoCampanha />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
