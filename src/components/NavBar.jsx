import React from 'react';

const NavBar = () => {
  const currentPath = window.location.pathname;

  return (
    <nav className="navbar navbar-expand-lg navbar-light rounded-bottom shadow">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
        <ul className="navbar-nav gap-4 text-uppercase" style={{ fontWeight: 600 }}>
          <li className="nav-item">
            <a className={`nav-link ${currentPath === '/' ? 'active' : ''}`} href="/">
              Conversor
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currentPath === '/jogo' ? 'active' : ''}`} href="/jogo">
              Jogo da Vida
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currentPath === '/restaurante' ? 'active' : ''}`} href="/restaurante">
              Restaurante
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
