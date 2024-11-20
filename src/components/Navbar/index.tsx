import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react'
import { IUsuario } from '../../types/IUsuario';

import { UserContext } from '../../contexts/userContext';

import { AuthContext } from '../../contexts/authContext';

interface HeaderProps {
  page?: string;
}

export const Navbar: React.FC<HeaderProps> = ({ page }) => {

  const [toggledMenu, setToggledMenu] = useState(false);

  const user = useContext(UserContext)

  const authenticated = useContext(AuthContext)

  const handleToggleMenu = () => {
    setToggledMenu(!toggledMenu)
  };

  const handleLogout = () => {
    authenticated.setAuthenticated(false)
  };


  return (
    <header>
      <nav className="nav-bar">
        <Link to="/" className="nav-logo">
          <img src="/assets/img/logos/logo-nacao-nutrida-white.svg" className="logo" alt="Logo Nação Nutrida" />
        </Link>
        <div className={`nav-menu ${toggledMenu ? 'toggled' : ''}`}>

          {authenticated.authenticated ?
            <>
              <ul className="row nav-list">
                <>
                  <Link to="/descobrir" className="nav-link">
                    <li>Descobrir</li>
                  </Link>
                  <Link to="/campanhas/criar" className="nav-link">
                    <li>Criar</li>
                  </Link>
                  <Link to="#" className="nav-link">
                    <li>Painel</li>
                  </Link>
                </>
              </ul>
              <div className="row nav-profile" onClick={handleToggleMenu}>
                <div className="img-wrapper">
                  <img
                    key={`${user.user.cd_foto_usuario}`}
                    src={`/assets/profile/${user.user.cd_foto_usuario}`}
                    className="img-profile"
                    alt="Foto de perfil"
                  />
                </div>
                <img className="seta" src="/assets/img/arrow-down.svg" alt="Icone de seta" />
              </div>
              <div className="toggle-menu header">
                <ul>
                  <>
                    <li className="toggle-link">
                      <Link to="#" className="sub titulo">
                        Notificações
                      </Link>
                    </li>
                    <li className="toggle-link">
                      <Link to="#" className="sub titulo">
                        Chat
                      </Link>
                    </li>
                    <li className="toggle-link">
                      <Link to="#" className="sub titulo">
                        Meus dados
                      </Link>
                    </li>
                  </>
                  <li className="toggle-link logout">
                    <Link onClick={handleLogout} to="/login" className="sub titulo">
                      Logout
                      <img src="/assets/img/icone_logout.svg" alt="Logout" />
                    </Link>
                  </li>
                </ul>
              </div>
            </>
            :
            page == "Login" ?
              <>
                <p className="nav-link">
                  Não tem conta?
                  <Link to="/cadastro" className="nav-link titulo-link">
                    Cadastrar-se
                  </Link>
                </p>
              </>
              :
              <>
                <p className="nav-link">
                  Já tem conta?
                  <Link to="/login" className="nav-link titulo-link">
                    Faça o login
                  </Link>
                </p>
              </>

          }


        </div>
      </nav>
    </header>
  );
};