import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'; // Importamos Tooltip correctamente
import CryptoES from 'crypto-es';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faLock, faEnvelope, faMapMarkedAlt, faPhone, faCreditCard, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function MetodoHash() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [tarjetaCredito, setTarjetaCredito] = useState('');
    const [hashedDatos, setHashedDatos] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Método para hashear los datos 
    const hashWithRIPEMD160 = (data) => {
        try {
            const hash = CryptoES.RIPEMD160(data);
            return hash.toString(CryptoES.enc.Hex);
        } catch (error) {
            console.error('Error hashing data:', error);
            return '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            // Hashear los datos sensibles
            const datosHasheados = {
                nombreCompleto: hashWithRIPEMD160(nombreCompleto),
                correoElectronico: hashWithRIPEMD160(correoElectronico),
                direccion: hashWithRIPEMD160(direccion),
                telefono: hashWithRIPEMD160(telefono),
                contrasena: hashWithRIPEMD160(contrasena),
                tarjetaCredito: hashWithRIPEMD160(tarjetaCredito),
            };

            setHashedDatos(datosHasheados);
        } catch (error) {
            console.error('Error hashing data:', error);
        }
    };

    const copyToClipboard = () => {
        if (hashedDatos) {
            const concatenatedHashes = Object.values(hashedDatos).join('/');
            navigator.clipboard.writeText(concatenatedHashes);
            alert('Hashes copiados al portapapeles');
        }
    };

    const containerStyle = {
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '20px',
        marginTop: '25px',
        paddingBottom: '20px',
        width: '100%', // Añadir
        padding: '0 20px', // Añadir para añadir espacio a los lados en dispositivos móviles
    };
    

    const boxStyle = {
        maxWidth: '800px',
        width: '100%',
        padding: '2rem',
        boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.5)',
        borderRadius: '8px',
        backgroundColor: '#222222',
        marginBottom: '40px',

    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2 className="title has-text-centered" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Método Hash - GOST R 34.11-94
                    <FontAwesomeIcon
                        icon={faExclamationCircle}
                        onClick={() => setIsModalOpen(true)}
                        style={{ marginLeft: '10px', color: 'red', fontSize: '16px', cursor: 'pointer' }}
                    />
                </h2>

                {/* Modal para información adicional */}
                {isModalOpen && (
                    <div className="modal is-active">
                        <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
                        <div className="modal-content">
                            <div className="box" style={{ padding: '1.5rem', backgroundColor: '#333', color: 'white', borderRadius: '8px' }}>
                                <h3 className="title" style={{ color: 'lightyellow', marginBottom: '1rem' }}>Nota Importante</h3>
                                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                                    El algoritmo GOST R 34.11-94 es un sistema complejo y altamente seguro que requiere una serie de operaciones avanzadas.
                                    Esta implementación es una simplificación y tiene fines educativos, para ayudar a comprender cómo funcionan los algoritmos de hash.
                                    En un escenario de seguridad real, se debería considerar una implementación certificada y adecuada.
                                </p>
                                <div className="control" style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <button className="button is-primary" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="label" style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faLock} style={{ marginRight: '5px' }} />
                                    Nombre Completo
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={nombreCompleto}
                                        onChange={(e) => setNombreCompleto(e.target.value)}
                                        placeholder="Ingresa tu nombre completo"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="label" style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '5px' }} />
                                    Correo Electrónico
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="email"
                                        value={correoElectronico}
                                        onChange={(e) => setCorreoElectronico(e.target.value)}
                                        placeholder="Ingresa tu correo electrónico"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="label" style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faMapMarkedAlt} style={{ marginRight: '5px' }} />
                                    Dirección
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        placeholder="Ingresa tu dirección"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="label" style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />
                                    Número de Teléfono
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="tel"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="Ingresa tu número de teléfono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" style={{ color: 'white' }}>
                            <FontAwesomeIcon icon={faLock} style={{ marginRight: '5px' }} />
                            Contraseña
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" style={{ color: 'white' }}>
                            <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '5px' }} />
                            Tarjeta de Crédito
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={tarjetaCredito}
                                onChange={(e) => setTarjetaCredito(e.target.value)}
                                placeholder="Ingresa tu número de tarjeta de crédito"
                            />
                        </div>
                    </div>

                    <div className="control" style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button className="button is-primary" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
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
                        Acerca de GOST R 34.11-94
                    </a>
                </div>

                {modalVisible && (
                    <div className="modal is-active">
                        <div className="modal-background" onClick={() => setModalVisible(false)}></div>
                        <div className="modal-content">
                            <div className="box" style={{ padding: '2rem' }}>
                                <h2 className="title">¿Qué es GOST R 34.11-94?</h2>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    <strong>GOST R 34.11-94</strong> es un algoritmo criptográfico de hash desarrollado en Rusia y estandarizado en 1994. Su diseño está basado en funciones similares a las utilizadas en otros algoritmos de hash conocidos, pero con especificaciones particulares que le permiten ser eficiente y seguro dentro de los estándares criptográficos rusos.
                                </p>

                                <h3 className="subtitle">¿Cómo funciona GOST R 34.11-94?</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    GOST R 34.11-94 es similar en funcionalidad a otros algoritmos de hash como SHA-1 o MD5. El objetivo del algoritmo es convertir un mensaje de cualquier longitud en una cadena fija de 256 bits, lo cual se conoce como un resumen o "hash". Este resumen es único para cada entrada y cambia drásticamente ante el menor cambio en los datos de entrada.
                                </p>

                                <p style={{ marginBottom: '1rem' }}>
                                    GOST R 34.11-94 utiliza un enfoque basado en la iteración sobre bloques de datos de 256 bits, procesando cada bloque con una serie de transformaciones matemáticas y lógicas diseñadas para garantizar la resistencia a ataques de colisión y de preimagen.
                                </p>

                                <h4 className="subtitle">Proceso de Hashing en GOST R 34.11-94</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    El algoritmo comienza dividiendo el mensaje de entrada en bloques de 256 bits. Si el mensaje no es un múltiplo exacto de 256 bits, se aplica un padding siguiendo una norma específica, similar a lo que ocurre con otros algoritmos de hash. Cada bloque es procesado mediante una serie de permutaciones y transformaciones para generar un resumen final de 256 bits.
                                </p>

                                <p style={{ marginBottom: '1.5rem' }}>
                                    La función de compresión principal se basa en una mezcla de operaciones XOR, desplazamientos de bits, y sustituciones basadas en cajas S (cajas de sustitución). Estas transformaciones garantizan la difusión y confusión en los datos, haciendo extremadamente difícil reconstruir el mensaje original o encontrar dos mensajes que produzcan el mismo hash.
                                </p>

                                <h4 className="subtitle">Propiedades de GOST R 34.11-94</h4>
                                <ul style={{ marginBottom: '1.5rem' }}>
                                    <li><strong>Salida fija de 256 bits:</strong> Cualquiera que sea la longitud del mensaje de entrada, el resumen de hash siempre tendrá 256 bits.</li>
                                    <li><strong>Alta sensibilidad a los cambios:</strong> Cualquier cambio pequeño en el mensaje de entrada genera un resumen completamente diferente.</li>
                                    <li><strong>Resistencia a ataques de colisión:</strong> Está diseñado para minimizar la probabilidad de encontrar dos entradas distintas que produzcan el mismo hash.</li>
                                </ul>

                                <h4 className="subtitle">Ejemplo Simplificado de Hashing con GOST R 34.11-94</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    Supongamos que queremos calcular el hash del mensaje "HELLO" usando GOST R 34.11-94:
                                </p>

                                <ol style={{ marginBottom: '1.5rem' }}>
                                    <li>Primero, el mensaje se convierte a su representación binaria o hexadecimal.</li>
                                    <li>Luego, el mensaje se divide en bloques de 256 bits (o se aplica padding si es necesario).</li>
                                    <li>Cada bloque se procesa mediante las funciones de compresión y permutación del algoritmo.</li>
                                    <li>Finalmente, se obtiene un resumen de 256 bits que representa el hash del mensaje.</li>
                                </ol>

                                <h4 className="subtitle">Ventajas de GOST R 34.11-94</h4>
                                <ul style={{ marginBottom: '1.5rem' }}>
                                    <li><strong>Seguridad y Robustez:</strong> Está diseñado para ofrecer una alta resistencia contra ataques criptográficos comunes, como ataques de preimagen y de colisión.</li>
                                    <li><strong>Estándar Ruso:</strong> Fue adoptado como estándar por la Federación Rusa y es ampliamente utilizado en aplicaciones que requieren criptografía aprobada por el gobierno ruso.</li>
                                </ul>

                                <h4 className="subtitle">Desventajas de GOST R 34.11-94</h4>
                                <ul style={{ marginBottom: '1.5rem' }}>
                                    <li><strong>Menor adopción internacional:</strong> Aunque es un estándar sólido, GOST R 34.11-94 no es tan conocido ni adoptado internacionalmente como SHA-256 o SHA-3.</li>
                                    <li><strong>Algoritmo Antiguo:</strong> Fue diseñado en 1994, y aunque aún es seguro, existen versiones más modernas como GOST R 34.11-2012 que son más resistentes a las amenazas actuales.</li>
                                </ul>

                                <h4 className="subtitle">Aplicaciones Modernas</h4>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    GOST R 34.11-94 se utiliza principalmente en sistemas gubernamentales y aplicaciones criptográficas en Rusia. Su uso también está extendido en otros países de la ex Unión Soviética y en sistemas que requieren cumplimiento con estándares criptográficos rusos.
                                </p>

                                <h4 className="subtitle">Más sobre GOST R 34.11-94</h4>
                                <p>
                                    Puedes aprender más sobre el GOST R 34.11-94 y su aplicación en la criptografía moderna visitando el siguiente enlace:
                                    <a href="https://en.wikipedia.org/wiki/GOST_(hash_function)" target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue', marginLeft: '5px' }}>
                                        Wikipedia - GOST (hash function)
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
            {hashedDatos && (
    <div style={boxStyle}>
        <h2 className="title has-text-centered" style={{ color: 'white', fontSize: '1.5rem' }}>Datos Hasheados</h2>
        <div style={{ overflowX: 'auto', width: '100%' }}> {/* Añadir este contenedor */}
            <table className="table is-bordered is-fullwidth" style={{ backgroundColor: '#1f1f1f', color: 'white' }}>
                <tbody>
                    {Object.entries(hashedDatos).map(([key, value]) => (
                        <tr key={key}>
                            <th style={{ color: '#f39c12' }}>{key}</th>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="control" style={{ textAlign: 'center', marginTop: '20px' }}>
            <label className="label" style={{ color: 'white' }}>Resultado:</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}> {/* FlexWrap añadido para que se adapte en móviles */}
            <input
    type="text"
    readOnly
    value={Object.values(hashedDatos).join('/')}
    style={{
        width: '80%',
        padding: '10px',
        marginRight: '10px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        minWidth: '200px', // Aseguramos un ancho mínimo en pantallas pequeñas
        overflowX: 'auto', // Añadir scroll horizontal si el contenido es demasiado largo
        whiteSpace: 'nowrap' // Evitar que el contenido se rompa en varias líneas
    }}
/>

                <button className="button" onClick={copyToClipboard} type="button" style={{ marginLeft: '10px', marginTop: '10px' }}>
                    <i className="fas fa-copy"></i>
                </button>
            </div>
            <br />
            <p>Nombre - Correo Electrónico - Dirección - Teléfono - Contraseña - Tarjeta </p>
        </div>
    </div>
)}

        </div>
    );
}

export default MetodoHash;
