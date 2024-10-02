import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Archivo CSS adicional
import { serpentEncrypt, serpentDecrypt } from '../utils/serpent2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faLock, faEnvelope, faMapMarkedAlt, faPhone, faCreditCard, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function CifradoSerpent() {
    const [mensaje, setMensaje] = useState('');
    const [clave, setClave] = useState('');
    const [resultado, setResultado] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = () => {
            if (modalVisible) {
                setModalVisible(false);
            } else {
                navigate(-1);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [modalVisible, navigate]);

    // Función para cifrar el mensaje utilizando Serpent
    const cifrarMensaje = () => {
        try {
            if (clave.length === 0) {
                alert('Por favor ingresa una clave válida.');
                return;
            }
            const encryptedMessage = serpentEncrypt(mensaje, clave);
            if (!encryptedMessage) {
                alert('El cifrado falló. Por favor, revisa el mensaje y la clave.');
                return;
            }
            setResultado(encryptedMessage);
            console.log("Mensaje cifrado:", encryptedMessage);
        } catch (error) {
            alert('Error durante el cifrado: ' + error.message);
            console.error('Detalles del error:', error);
        }
    };

    // Función para descifrar el mensaje utilizando Serpent
    const descifrarMensaje = () => {
        try {
            if (clave.length === 0) {
                alert('Por favor ingresa una clave válida.');
                return;
            }
            const decryptedMessage = serpentDecrypt(resultado, clave);
            if (!decryptedMessage) {
                alert('El descifrado falló. Por favor, revisa el mensaje cifrado y la clave.');
                return;
            }
            setResultado(decryptedMessage);
            console.log("Mensaje descifrado:", decryptedMessage);
        } catch (error) {
            alert('Error durante el descifrado: ' + error.message);
            console.error('Detalles del error:', error);
        }
    };

    const copyToClipboard = () => {
        if (resultado) {
            navigator.clipboard.writeText(resultado);
            alert('Texto copiado al portapapeles');
        } else {
            alert('No hay texto para copiar');
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

    const buttonIconStyle = {
        marginRight: '5px',
    };

    const resultStyle = {
        backgroundColor: '#14161A',
        borderColor: resultado ? '#15C43B' : '#14161A', // Usamos borderColor separado
        color: resultado ? 'white' : 'black',
        padding: '1rem',
        borderWidth: '2px', // Define solo el ancho del borde
        borderStyle: 'solid', // Define el estilo del borde
        borderRadius: '4px',
        width: '100%',
        marginTop: '1rem',
        textAlign: 'center',
    };


    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
            <h1 className="title has-text-centered" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Cifrado Serpent
          <FontAwesomeIcon
            icon={faExclamationCircle}
            onClick={() => setIsModalOpen(true)}
            style={{ marginLeft: '10px', color: 'red', fontSize: '16px', cursor: 'pointer' }}
          />
        </h1>

        {/* Modal para información adicional sobre Serpent */}
        {isModalOpen && (
          <div className="modal is-active">
            <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
            <div className="modal-content">
              <div className="box" style={{ padding: '1.5rem', backgroundColor: '#333', color: 'white', borderRadius: '8px' }}>
                <h3 className="title" style={{ color: 'lightyellow', marginBottom: '1rem' }}>Advertencia Importante</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  El cifrado Serpent es un algoritmo de cifrado simétrico de bloque que fue uno de los finalistas en la competencia AES.
                  Este algoritmo está diseñado para proporcionar un alto nivel de seguridad y utiliza múltiples rondas de sustitución y permutación.
                  Su implementación requiere conocimientos sobre criptografía simétrica y técnicas de sustitución-permutación.
                  En esta pagina se proporciona solo con fines educativos. En un entorno de producción, es importante contar con una implementación segura y bien revisada.
                </p>
                <div className="control" style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button className="button is-primary" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                </div>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
          </div>
        )}                <form>
                    <div className="field">
                        <label className="label" style={{ color: 'white' }}>
                            <i className="fas fa-envelope" style={buttonIconStyle}></i> Mensaje
                        </label>
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

                    <div className="field">
                        <label className="label" style={{ color: 'white' }}>
                            <i className="fas fa-key" style={buttonIconStyle}></i> Clave (debe ser segura)
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                placeholder="Ingresa la clave"
                            />
                        </div>
                    </div>

                    <div className="control">
                        <button className="button is-primary" type="button" onClick={cifrarMensaje}>
                            <i className="fas fa-lock" style={buttonIconStyle}></i> Cifrar
                        </button>

                        <button className="button is-danger" type="button" onClick={descifrarMensaje} style={{ marginLeft: '10px' }}>
                            <i className="fas fa-unlock" style={buttonIconStyle}></i> Descifrar
                        </button>
                    </div>

                    <br />

                    <div className="field">
                        <label className="label" style={{ color: 'white' }}>Resultado:</label>
                        <div className="control is-flex">
                            <textarea style={resultStyle} readOnly value={resultado}></textarea>
                            <button className="button" onClick={copyToClipboard} type="button" style={{ marginLeft: '10px' }}>
                                <i className="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                </form>
                {/* Enlace para mostrar la explicación del Cifrado Serpent */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a
                        role="button" // Añadido para que se comporte como un botón
                        onClick={() => setModalVisible(true)}
                        style={{
                            color: 'lightblue',
                            textDecoration: 'none',
                            padding: '10px 20px',
                            display: 'inline-block',
                            borderRadius: '8px',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer', // Añadido para indicar que es interactivo
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-5px)';
                            e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                            e.target.style.color = '#ffffff';  // Cambia el color al pasar el cursor
                            e.target.style.backgroundColor = '#2b2f38'; // Agregar fondo oscuro
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                            e.target.style.color = 'lightblue'; // Vuelve al color original
                            e.target.style.backgroundColor = 'transparent'; // Sin fondo
                        }}
                    >
                        Acerca de Cifrado Serpent
                    </a>
                </div>


                {modalVisible && (
                    <div className="modal is-active">
                        <div className="modal-background" onClick={() => setModalVisible(false)}></div>
                        <div className="modal-content">
                            <div className="box" style={{ padding: '2rem' }}>
                                <h2 className="title">¿Qué es el Cifrado Serpent?</h2>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    El <strong>Cifrado Serpent</strong> es un algoritmo de cifrado de bloque que fue finalista en la competencia para convertirse en el estándar de cifrado avanzado (AES). Fue diseñado por Ross Anderson, Eli Biham y Lars Knudsen, y se destaca por su alta seguridad y eficiencia en la implementación. Utiliza una longitud de bloque fija de **128 bits** y soporta claves de **128, 192 y 256 bits**.
                                </p>

                                <h3 className="subtitle">¿Cómo funciona el Cifrado Serpent?</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    Serpent divide el mensaje en bloques de **128 bits** y aplica **32 rondas** de transformaciones basadas en sustituciones y permutaciones. Cada ronda incluye operaciones de **Sustitución (S-Box)** y **Permutación lineal**, junto con operaciones **XOR** con las subclaves generadas a partir de la clave principal. Estas rondas aseguran que el mensaje sea mezclado y modificado de manera que sea prácticamente imposible para un atacante recuperar el contenido sin la clave adecuada.
                                </p>

                                <h4 className="subtitle">Proceso de Cifrado</h4>
                                <ol style={{ marginBottom: '1.5rem' }}>
                                    <li>La clave principal se expande a un conjunto de **subclaves** que se utilizarán durante cada ronda de cifrado.</li>
                                    <li>Cada bloque de datos se transforma a través de una serie de **operaciones de sustitución (S-Box)**, **permutaciones lineales**, y operaciones **XOR** con las subclaves.</li>
                                    <li>El resultado de las **32 rondas** es el bloque cifrado, que se convierte en la salida final del proceso de cifrado.</li>
                                </ol>

                                <h4 className="subtitle">Ejemplo Simplificado de Cifrado Serpent</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    Supongamos que tenemos un mensaje "HOLA MUNDO" que queremos cifrar usando una clave de **128 bits**. Cada letra del mensaje se convierte en un valor binario de **128 bits**. En cada ronda:
                                </p>
                                <table className="table is-striped is-bordered" style={{ marginBottom: '1.5rem', backgroundColor: '#1f1f1f', color: 'white' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#333', color: 'white' }}>
                                            <th>Etapa</th>
                                            <th>Operación</th>
                                            <th>Resultado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mensaje Original (en binario)</td>
                                            <td>01001000 01001111 01001100 01000001...</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>XOR con Subclave 1</td>
                                            <td>11100101 11001010 10111011...</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Aplicar S-Box</td>
                                            <td>10101100 01110101 00111001...</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Permutación Lineal</td>
                                            <td>01110010 10110100 11011100...</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Este proceso se repite durante **32 rondas**, utilizando diferentes subclaves en cada ronda. Al final, el bloque cifrado se produce, y este proceso se aplica a cada bloque del mensaje original.
                                </p>

                                <h4 className="subtitle">Proceso de Descifrado</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    Para descifrar un mensaje cifrado con Serpent, se aplican las operaciones **inversas** de las **32 rondas** de cifrado, utilizando las subclaves en **orden inverso**. Las operaciones S-Box también tienen una versión inversa que permite revertir las transformaciones realizadas durante el cifrado. Esto garantiza que se pueda recuperar el mensaje original siempre que se tenga la clave correcta.
                                </p>

                                <h4 className="subtitle">Ventajas y Desventajas</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    <strong>Ventajas:</strong>
                                </p>
                                <ul style={{ marginBottom: '1.5rem' }}>
                                    <li>**Alta seguridad** gracias al uso de múltiples rondas de transformaciones.</li>
                                    <li>**Soporte para claves de hasta 256 bits**, lo cual ofrece una protección fuerte contra ataques de fuerza bruta.</li>
                                    <li>**Eficiencia en hardware**: Serpent puede implementarse de manera eficiente tanto en hardware como en software.</li>
                                    <li>**Resistencia contra ataques cuánticos**: Su diseño es lo suficientemente robusto como para resistir ataques futuros de computadoras cuánticas.</li>
                                </ul>

                                <p style={{ marginBottom: '1rem' }}>
                                    <strong>Desventajas:</strong>
                                </p>
                                <ul style={{ marginBottom: '1.5rem' }}>
                                    <li>Es **más complejo de implementar** comparado con otros cifrados simétricos, debido a la cantidad de rondas y transformaciones involucradas.</li>
                                    <li>**Uso intensivo de recursos**: Requiere un mayor uso de recursos de cómputo, lo que podría ser un inconveniente en dispositivos con recursos limitados.</li>
                                    <li>No fue elegido como el estándar AES, por lo cual tiene **menos adopción generalizada** en comparación con otros algoritmos como Rijndael (AES).</li>
                                </ul>

                                <h4 className="subtitle">Guía de Uso</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    <strong>Pasos para cifrar:</strong>
                                </p>
                                <ul>
                                    <li>1. Define una clave segura de **128, 192, o 256 bits**.</li>
                                    <li>2. Divide el mensaje en bloques de **128 bits**.</li>
                                    <li>3. Aplica las **32 rondas** de cifrado utilizando las subclaves generadas.</li>
                                </ul>

                                <p style={{ marginBottom: '1rem' }}>
                                    <strong>Pasos para descifrar:</strong>
                                </p>
                                <ul>
                                    <li>1. Usa la misma clave que se usó para cifrar el mensaje.</li>
                                    <li>2. Aplica las **32 rondas de descifrado** en orden inverso para recuperar el mensaje original.</li>
                                </ul>

                                <h4 className="subtitle">Aplicaciones Modernas</h4>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Aunque Serpent no fue seleccionado como el estándar AES, se considera uno de los algoritmos de cifrado más seguros y todavía se utiliza en aplicaciones que requieren un alto nivel de seguridad. Su diseño simple y resistencia contra ataques criptográficos lo hacen adecuado para aplicaciones que necesitan **cifrado de datos a largo plazo**, como bases de datos sensibles y archivos que deben permanecer seguros por años.
                                </p>

                                <h4 className="subtitle">Más sobre el Cifrado Serpent</h4>
                                <p>
                                    Puedes aprender más sobre el cifrado Serpent y su historia en este enlace:
                                    <a href="https://en.wikipedia.org/wiki/Serpent_(cipher)" target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue', marginLeft: '5px' }}>
                                        Wikipedia - Cifrado Serpent
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

export default CifradoSerpent;
