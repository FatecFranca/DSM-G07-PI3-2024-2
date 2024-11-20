import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="footer-bar">
      <img
        className="logo-footer"
        src="/assets/img/logos/logo-nacao-nutrida-white.svg"
        alt="Logo Nação Nutrida"
      />
      <ul className="menu-footer">
        <h2 className="sub titulo white">Ações sociais</h2>
        <Link to="#">
          <li className="list-item">Criar</li>
        </Link>
        <Link to="#">
          <li className="list-item">Fazer doação</li>
        </Link>
        <Link to="#">
          <li className="list-item">Descobrir</li>
        </Link>
      </ul>
      <ul className="menu-footer">
        <h2 className="sub titulo white">Ajuda</h2>
        <Link to="#">
          <li className="list-item">Fale conosco</li>
        </Link>
        <Link to="#">
          <li className="list-item">Dúvidas frequentes</li>
        </Link>
        <Link to="#">
          <li className="list-item">Atualizações</li>
        </Link>
      </ul>
      <ul className="menu-footer">
        <h2 className="sub titulo white">Redes sociais</h2>
        <div className="redes-sociais row">
          <Link to="#">
            <img
              className="icone-midias"
              src="/assets/img/logo-facebook.svg"
              title="Facebook"
            />
          </Link>
          <Link to="#">
            <img
              className="icone-midias"
              src="/assets/img/logo-instagram.svg"
              title="Instagram"
            />
          </Link>
        </div>
      </ul>
    </footer>
  );
};