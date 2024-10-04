import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function CifradoNTRU() {
  const [mensaje, setMensaje] = useState('');
  const [clavePrivada, setClavePrivada] = useState('');
  const [clavePublica, setClavePublica] = useState('');
  const [resultado, setResultado] = useState('');
  const [mensajeCifradoGenerado, setMensajeCifradoGenerado] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [accion, setAccion] = useState('cifrar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Añadido el estado para la visibilidad del modal

  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      setIsModalOpen(false);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const generarClavePrivada = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = Math.floor(10 + Math.random() * 3); // Longitud entre 10 y 12
    let clave = '';
    for (let i = 0; i < longitud; i++) {
      clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return clave;
  };

  const cifrarMensaje = () => {
    if (mensaje.length === 0) {
      alert('Por favor ingresa un mensaje válido');
      return;
    }

    const claveGenerada = generarClavePrivada();
    setClavePrivada(claveGenerada);
    setClavePublica(''); // Reseteamos la clave pública

    // Simulando cifrado (este ejemplo sólo retorna la clave generada como cifrado)
    setMensajeCifradoGenerado(claveGenerada);
    setResultado(`${claveGenerada}`);
  };

  const descifrarMensaje = () => {
    if (mensaje.length === 0 || clavePublica.length === 0) {
      alert('Por favor ingresa un mensaje cifrado y una clave válida');
      return;
    }

    // Verificar si el mensaje y la clave proporcionados coinciden con los generados al cifrar
    if (mensaje === mensajeCifradoGenerado && clavePublica === clavePrivada) {
      setResultado('El mensaje es válido');
    } else {
      setResultado('El mensaje o la clave no son válidos');
    }
  };

  const handleChangeAccion = () => {
    setAccion(accion === 'cifrar' ? 'descifrar' : 'cifrar');
    setResultado('');
    setMensaje('');
    setClavePrivada('');
    setClavePublica('');
    setMensajeCifradoGenerado('');
  };

  const copyToClipboard = () => {
    if (clavePrivada) {
      navigator.clipboard.writeText(clavePrivada);
      alert('Clave privada copiada al portapapeles');
    } else {
      alert('No hay clave privada para copiar');
    }
  };

  const containerStyle = {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const boxStyle = {
    maxWidth: isMobile ? '380px' : '500px',
    width: '100%',
    padding: isMobile ? '1rem' : '2rem',
    boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    backgroundColor: '#222222',
    marginTop: isMobile ? '1rem' : '0rem',
  };

  const resultStyle = {
    backgroundColor: '#14161A',
    border: resultado.includes('no son válidos') ? '2px solid red' : '2px solid #15C43B',
    color: resultado.includes('no son válidos') ? 'red' : 'white',
    padding: '1rem',
    borderRadius: '4px',
    width: '100%',
    marginTop: '1rem',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 className="title has-text-centered" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Cifrado - NTRUEncrypt
          <FontAwesomeIcon
            icon={faExclamationCircle}
            onClick={() => setIsModalOpen(true)}
            style={{ marginLeft: '10px', color: 'red', fontSize: '16px', cursor: 'pointer' }}
          />
        </h1>

        {isModalOpen && (
          <div className="modal is-active">
            <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
            <div className="modal-content">
              <div className="box" style={{ padding: '1.5rem', backgroundColor: '#333', color: 'white', borderRadius: '8px' }}>
                <h3 className="title" style={{ color: 'lightyellow', marginBottom: '1rem' }}>Advertencia Importante</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  El cifrado NTRUEncrypt es un algoritmo criptográfico de clave pública basado en la teoría de reticulados.
                  Su implementación y comprensión requieren conocimientos avanzados en matemáticas, específicamente en álgebra abstracta y teoría de reticulados.
                  Este ejemplo es solo para fines educativos y simplificados. En un entorno de producción, es importante contar con una implementación robusta y certificada.
                </p>
                <div className="control" style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button className="button is-primary" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                </div>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
          </div>
        )}

        <br />
        <form>
          <div className="field">
            <label className="label" style={{ color: 'white' }}>Mensaje</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Ingresa el mensaje"
              />
            </div>
          </div>

          {accion === 'cifrar' ? (
            <div className="field">
              <label className="label" style={{ color: 'white' }}>Clave Privada Generada</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={clavePrivada}
                  readOnly
                  placeholder="La clave se genera automáticamente al cifrar"
                />
              </div>
            </div>
          ) : (
            <div className="field">
              <label className="label" style={{ color: 'white' }}>Clave Pública (para descifrar)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={clavePublica}
                  onChange={(e) => setClavePublica(e.target.value)}
                  placeholder="Ingresa la clave pública"
                />
              </div>
            </div>
          )}

          <div className="control">
            <button
              className="button is-primary"
              type="button"
              onClick={accion === 'cifrar' ? cifrarMensaje : descifrarMensaje}
            >
              {accion === 'cifrar' ? 'Cifrar' : 'Descifrar'}
            </button>

            <button className="button is-info" type="button" onClick={handleChangeAccion} style={{ marginLeft: '10px' }}>
              Cambiar
            </button>
          </div>

          <br />

          <div className="field">
            <label className="label" style={{ color: 'white' }}>Resultado:</label>
            <div className="control is-flex">
              <textarea style={resultStyle} readOnly value={resultado}></textarea>
              <button className="button" onClick={copyToClipboard} type="button" style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>
        </form>
        

        {/* Enlace para mostrar la explicación del Cifrado NTRU centrado */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a
            role="button"
            onClick={() => setModalVisible(true)}
            style={{
              color: 'lightblue',
              textDecoration: 'none',
              padding: '10px 20px',
              display: 'inline-block',
              borderRadius: '8px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
              e.target.style.color = '#ffffff';
              e.target.style.backgroundColor = '#2b2f38';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              e.target.style.color = 'lightblue';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            Acerca de Cifrado NTRU
          </a>
        </div>

        {modalVisible && (
          <div className="modal is-active">
            <div className="modal-background" onClick={() => setModalVisible(false)}></div>
            <div className="modal-content">
              <div className="box" style={{ padding: '2rem' }}>
                <h2 className="title">¿Qué es el Cifrado NTRU?</h2>
                <p style={{ marginBottom: '1.5rem' }}>
                  El <strong>Cifrado NTRU</strong> es un esquema criptográfico de clave pública basado en reticulados. Se utiliza principalmente para garantizar la seguridad de las comunicaciones en un futuro donde las computadoras cuánticas podrían romper muchos de los esquemas de criptografía actuales.
                </p>

                <h3 className="subtitle">¿Cómo funciona el Cifrado NTRU?</h3>
                <p style={{ marginBottom: '1rem' }}>
                  NTRU se basa en la teoría de reticulados y usa polinomios para crear un problema matemático difícil de resolver, similar al de la factorización en RSA pero mucho más resistente a ataques cuánticos.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  Básicamente, NTRU usa una combinación de polinomios públicos y secretos para cifrar un mensaje. Durante el cifrado, el mensaje se transforma usando una clave pública, y solo el propietario de la clave privada puede descifrarlo.
                </p>

                <h4 className="subtitle">Ejemplo Simplificado de Cifrado NTRU</h4>
                <p style={{ marginBottom: '1rem' }}>
                  Supongamos que queremos cifrar el mensaje "HELLO" usando una versión simplificada de NTRU. Primero, convertimos cada letra a su valor ASCII:
                </p>

                <table className="table is-striped is-bordered" style={{ marginBottom: '1.5rem', backgroundColor: '#1f1f1f', color: 'white' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#333', color: 'white' }}>
                      <th>Carácter</th>
                      <th>Código ASCII</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>H</td>
                      <td>72</td>
                    </tr>
                    <tr>
                      <td>E</td>
                      <td>69</td>
                    </tr>
                    <tr>
                      <td>L</td>
                      <td>76</td>
                    </tr>
                    <tr>
                      <td>L</td>
                      <td>76</td>
                    </tr>
                    <tr>
                      <td>O</td>
                      <td>79</td>
                    </tr>
                  </tbody>
                </table>

                <p style={{ marginBottom: '1rem' }}>
                  Luego, utilizamos un polinomio clave, por ejemplo: <strong>h(x) = [3, 1, 4]</strong>, y otro polinomio aleatorio <strong>r(x) = [1, -1]</strong>.
                </p>

                <h4 className="subtitle">Proceso de Cifrado</h4>
                <p style={{ marginBottom: '1rem' }}>
                  - Representamos el mensaje como un polinomio <strong>m(x) = [72, 69, 76, 76, 79]</strong>.
                  <br />
                  - Multiplicamos el polinomio aleatorio <strong>r(x)</strong> con la clave pública <strong>h(x)</strong> y sumamos el mensaje:
                </p>

                <p style={{ marginBottom: '1rem' }}>
                  <strong>e(x) = r(x) * h(x) + m(x) mod q</strong>, donde <strong>q = 256</strong> (para evitar desbordamientos).
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                  El resultado de esta operación es el polinomio cifrado <strong>e(x)</strong>, que ahora contiene el mensaje encriptado y que no se puede entender sin la clave privada.
                </p>

                <h4 className="subtitle">Proceso de Descifrado</h4>
                <p style={{ marginBottom: '1rem' }}>
                  Para descifrar el mensaje, la persona con la clave privada <strong>f(x)</strong> calcula:
                </p>

                <p style={{ marginBottom: '1rem' }}>
                  <strong>a(x) = f(x) * e(x) mod q</strong>.
                </p>

                <p style={{ marginBottom: '1rem' }}>
                  Luego de algunas operaciones adicionales (reducción y simplificación), se obtiene el mensaje original <strong>m(x)</strong>.
                </p>

                <h4 className="subtitle">Ventajas del Cifrado NTRU</h4>
                <ul style={{ marginBottom: '1.5rem' }}>
                  <li><strong>Seguridad post-cuántica:</strong> NTRU está diseñado para ser seguro frente a ataques de computadoras cuánticas, lo cual es crucial para el futuro de la criptografía.</li>
                  <li><strong>Rapidez:</strong> Las operaciones de cifrado y descifrado de NTRU son más rápidas en comparación con otros algoritmos de criptografía de clave pública como RSA y ECC.</li>
                  <li><strong>Alta eficiencia:</strong> NTRU tiene una implementación eficiente tanto en hardware como en software, haciéndolo ideal para dispositivos con recursos limitados.</li>
                </ul>

                <h4 className="subtitle">Desventajas del Cifrado NTRU</h4>
                <ul style={{ marginBottom: '1.5rem' }}>
                  <li><strong>Tamaño de la clave:</strong> Las claves en NTRU suelen ser más grandes en comparación con otras técnicas de criptografía, lo que puede requerir más almacenamiento.</li>
                  <li><strong>Complejidad matemática:</strong> La implementación de NTRU requiere un conocimiento más profundo de matemáticas avanzadas, en comparación con otros algoritmos como RSA.</li>
                  <li><strong>Interoperabilidad:</strong> NTRU no está tan ampliamente adoptado como RSA o ECC, lo cual puede limitar su uso en algunas aplicaciones que requieren interoperabilidad con sistemas más comunes.</li>
                </ul>

                <h4 className="subtitle">Aplicaciones Modernas</h4>
                <p style={{ marginBottom: '1.5rem' }}>
                  NTRU se utiliza principalmente en contextos donde se necesita una gran seguridad, especialmente en la criptografía post-cuántica. Es una opción popular para dispositivos IoT (Internet de las Cosas) debido a su eficiencia y velocidad.
                </p>

                <h4 className="subtitle">Más sobre el Cifrado NTRU</h4>
                <p>
                  Puedes aprender más sobre el cifrado NTRU y su aplicación en la criptografía moderna visitando el siguiente enlace:
                  <a href="https://en.wikipedia.org/wiki/NTRUEncrypt" target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue', marginLeft: '5px' }}>
                    Wikipedia - NTRUEncrypt
                  </a>
                </p>

                <button className="button is-primary" onClick={() => setModalVisible(false)} style={{ marginTop: '1.5rem' }}>
                  Cerrar
                </button>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setModalVisible(false)}></button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CifradoNTRU;
