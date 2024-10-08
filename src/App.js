import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './css/inicio.css';
import 'bulma/css/bulma.min.css';
import CifradoCesar from './components/CifradoCesar';
import CifradoEscitala from './components/CifradoEscitala';
import CifradoSerpent from './components/CifradoSerpent';  
import CifradoNTRU from './components/CifradoNTRU.jsx';
import MetodoHash from './components/MetodoHash.jsx'; 
import AcercaDe from './components/AcercaDe.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilePdf } from '@fortawesome/free-solid-svg-icons'; // Íconos de Inicio y PDF
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; // Ícono de Facebook

function App() {
  const [isModalVisible, setModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal

  // Función para mostrar el modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Router>
      <div>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#141414', color: '#ffffff' }}>
      <h1 style={{ margin: 0 }}>Encryptione</h1>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

      <Link
        to="/"
        style={{
          color: '#ffffff',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.3s ease', // Efecto suave para el cambio de color
        }}
        onMouseEnter={(e) => {
          e.target.style.color = 'lightblue'; // Cambiar el color cuando el puntero esté sobre el enlace
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#ffffff'; // Restaurar el color original cuando el puntero se aleje del enlace
        }}
      >
        <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
        Inicio
      </Link>
      {/* Enlace a la documentación */}
      <a
  href="/doc/DOCUMENTACION_BINA10.pdf"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    color: '#ffffff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.color = 'lightblue';
  }}
  onMouseLeave={(e) => {
    e.target.style.color = '#ffffff';
  }}
>
  <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '8px' }} />
  Documentación
</a>

          </div>
    </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="hero is-fullheight">
                <div className="hero-body" style={{ height: '90vh' }}>
                  <div className="container has-text-centered">
                    <h1 className="title">
                      Seguridad Informática: Cifrado y Descifrado
                    </h1>
                    <p className="subtitle">
                      Descubre cómo los cifrados clásicos pueden ayudarte a proteger tu información de forma sencilla y efectiva.
                    </p>

                    <div className="buttons is-centered">
                      <button className="button is-success is-medium" onClick={openModal}>
                        Empezar Ahora
                      </button>
                      <Link to="/acerca-de" className="button is-medium">
                        Acerca de
                      </Link>
                    </div>

                    {/* Modal */}
                    {isModalVisible && (
                      <div className="modal is-active">
                        <div className="modal-background" onClick={closeModal}></div>
                        <div className="modal-card">
                          <header className="modal-card-head">
                            <p className="modal-card-title">¿Con qué deseas cifrar o descifrar?</p>
                            <button className="delete" aria-label="close" onClick={closeModal}></button>
                          </header>
                          <section className="modal-card-body has-text-centered">
                            <p>Elige un método de cifrado para continuar:</p>
                            <div className="buttons is-centered" style={{ marginTop: '20px' }}>
                              <Link to="/cifrado-cesar" className="button" onClick={closeModal} style={{ background: '#213bbc' }}>
                                Cifrado César
                              </Link>
                              <Link to="/cifrado-escitala" className="button" onClick={closeModal} style={{ background: '#213bbc' }}>
                                Cifrado Escítala
                              </Link>
                              <Link to="/cifrado-serpent" className="button" onClick={closeModal} style={{ background: '#213bbc' }}>
                                Cifrado Serpent
                              </Link>
                              <Link to="/cifrado-ntru" className="button" onClick={closeModal} style={{ background: '#213bbc' }}>
                                Cifrado NTRUEncrypt
                              </Link>
                              <Link to="/metodo-hash" className="button" onClick={closeModal} style={{ background: '#213bbc' }}>
                                Método Hash
                              </Link>
                            </div>
                          </section>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            }
          />
          <Route path="/cifrado-cesar" element={<CifradoCesar />} />
          <Route path="/cifrado-escitala" element={<CifradoEscitala />} />
          <Route path="/cifrado-serpent" element={<CifradoSerpent />} />
          <Route path="/cifrado-ntru" element={<CifradoNTRU />} />
          <Route path="/metodo-hash" element={<MetodoHash />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
        </Routes>

        {/* Footer */}
        <footer style={{ backgroundColor: '#141414', color: '#ffffff', padding: '10px 0', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
          <p>© 2024 Todos los derechos reservados. Emmanuel Rodriguez Martinez. 7"B"</p>
          <a href="https://www.facebook.com/profile.php?id=100078391132863&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '8px' }} />
            Facebook
          </a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
