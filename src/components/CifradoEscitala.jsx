import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';  // Asegúrate de tener un archivo CSS adicional

function CifradoEscitala() {
    const [mensaje, setMensaje] = useState('');
    const [clave, setClave] = useState(0);
    const [resultado, setResultado] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [tabla, setTabla] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


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

    const generarTabla = (filas, columnas, mensajeLimpio) => {
        const tabla = [];
        let index = 0;
        for (let i = 0; i < filas; i++) {
            const fila = [];
            for (let j = 0; j < columnas; j++) {
                fila.push(mensajeLimpio[index] || ' '); // Rellenar con espacios vacíos si es necesario
                index++;
            }
            tabla.push(fila);
        }
        return tabla;
    };

    const cifrarMensaje = () => {
        if (clave <= 0 || mensaje.length === 0) {
            alert('Debes ingresar una clave válida y un mensaje.');
            return;
        }

        if (clave > mensaje.length) {
            alert('La clave no puede ser mayor al número de caracteres del mensaje.');
            return;
        }

        const mensajeLimpio = mensaje.replace(/\s+/g, '');

        let columnas = clave;
        let filas = Math.ceil(mensajeLimpio.length / columnas);
        let resultadoCifrado = '';

        // Generar la tabla para mostrar cómo se distribuye el mensaje
        const tablaGenerada = generarTabla(filas, columnas, mensajeLimpio);
        setTabla(tablaGenerada);

        // Cifrado recorriendo columnas correctamente
        for (let i = 0; i < columnas; i++) {
            for (let j = 0; j < filas; j++) {
                if (tablaGenerada[j][i] !== ' ') {  // Evitar añadir espacios vacíos
                    resultadoCifrado += tablaGenerada[j][i];  // Toma las letras por columnas
                }
            }
        }
        setResultado(resultadoCifrado);  // Guarda el resultado en el estado para mostrarlo
    };

    const descifrarMensaje = () => {
        if (clave <= 0 || mensaje.length === 0) {
            alert('Debes ingresar una clave válida y un mensaje.');
            return;
        }

        const mensajeLimpio = mensaje.replace(/\s+/g, ''); // Eliminar espacios

        let columnas = clave; // El número de columnas
        let filas = Math.ceil(mensajeLimpio.length / columnas); // El número de filas

        // Limpiar la tabla antes de descifrar
        setTabla([]);

        // Creamos una matriz vacía para ir colocando los caracteres descifrados
        let resultadoDescifrado = new Array(mensajeLimpio.length);

        // Inicializamos un índice para recorrer el mensaje cifrado
        let charIndex = 0;

        // Colocamos los caracteres en la matriz por filas
        for (let col = 0; col < columnas; col++) {
            for (let row = 0; row < filas; row++) {
                const index = row * columnas + col;
                if (index < mensajeLimpio.length) {
                    resultadoDescifrado[index] = mensajeLimpio[charIndex++];
                }
            }
        }

        // Unimos el resultado para formar el mensaje descifrado
        setResultado(resultadoDescifrado.join(''));
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
        maxWidth: isMobile ? '380px' : '500px', // Ancho más pequeño en móviles
        width: '100%',
        padding: isMobile ? '1rem' : '2rem', // Padding más pequeño en móviles
        boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.5)',
        borderRadius: '8px',
        backgroundColor: '#222222',
        marginTop: isMobile ? '1rem' : '0rem',

    };

    const backButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '1.2rem',
        cursor: 'pointer',
    };

    const buttonIconStyle = {
        marginRight: '5px',
    };

    const resultStyle = {
        backgroundColor: '#14161A',
        borderColor: resultado ? '#15C43B' : '#14161A',
        color: resultado ? 'white' : 'black',
        padding: '1rem',
        borderRadius: '4px',
        border: '2px solid',
        width: '100%',
        marginTop: '1rem',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>

            <div style={boxStyle}>
                <h1 className="title has-text-centered" style={{ color: 'white' }}>Cifrado Escítala</h1>
                <form>
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
                            <i className="fas fa-key" style={buttonIconStyle}></i> Clave (Número de columnas)
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
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

                    {tabla.length > 0 && (
                        <div className="field" style={{ marginTop: '1rem' }}>
                            <label className="label" style={{ color: 'white' }}>Distribución en la tabla:</label>
                            <table className="table is-bordered is-striped" style={{ backgroundColor: '#333', color: 'white' }}>
                                <tbody>
                                    {tabla.map((fila, index) => (
                                        <tr key={index}>
                                            {fila.map((letra, idx) => (
                                                <td key={idx} style={{ textAlign: 'center' }}>{letra}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a
                        href="javascript:void(0)"
                        onClick={() => setModalVisible(true)}
                        style={{
                            color: '#ffffff',
                            textDecoration: 'none',
                            padding: '10px 20px',
                            display: 'inline-block',
                            borderRadius: '8px',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-5px)';
                            e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                            e.target.style.color = '#ffffff';  // Cambia el color al pasar el cursor
                            e.target.style.backgroundColor = '#2b2f38'; // Agregar fondo
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                            e.target.style.color = '#ffffff'; // Vuelve al color original
                            e.target.style.backgroundColor = 'transparent'; // Sin fondo
                        }}
                    >
                        Acerca de Cifrado Escítala
                    </a>
                </div>

                {modalVisible && (
                    <div className="modal is-active">
                        <div className="modal-background" onClick={() => setModalVisible(false)}></div>
                        <div className="modal-content">
                            <div className="box" style={{ padding: '2rem' }}>
                                <h2 className="title">¿Qué es el Cifrado Escítala?</h2>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    El <strong>Cifrado Escítala</strong> es uno de los métodos de cifrado más antiguos. Se utilizaba en la antigua Grecia, especialmente por los espartanos. Consistía en una vara o cilindro (la escítala) alrededor del cual se enrollaba una tira de cuero o pergamino. El mensaje se escribía a lo largo de la tira y, al desenrollarla, las letras parecían desordenadas, haciéndolo ilegible para cualquiera que no tuviera una vara del mismo diámetro.
                                </p>

                                <h3 className="subtitle">¿Cómo funciona el cifrado Escítala?</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    El cifrado por Escítala es un ejemplo de cifrado por transposición, donde el orden de las letras en el mensaje original es alterado según un patrón determinado por el número de columnas (o la clave). En este caso, el mensaje es escrito en varias filas y luego es leído columna por columna.
                                </p>

                                <h4 className="subtitle">Proceso de Cifrado</h4>
                                <ol style={{ marginBottom: '1.5rem' }}>
                                    <li>Elige el número de columnas o clave (que corresponde a cuántas filas se escribirán).</li>
                                    <li>Escribe el mensaje en filas, según el número de columnas.</li>
                                    <li>Lee las letras de forma vertical, columna por columna, para formar el mensaje cifrado.</li>
                                </ol>

                                <h4 className="subtitle">Ejemplo de Cifrado</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    Supongamos que queremos cifrar el mensaje "HOLA MUNDO" con una clave de 4 columnas. Se vería así:
                                </p>

                                <table className="table is-striped is-bordered" style={{ marginBottom: '1.5rem', backgroundColor: '#1f1f1f', color: 'white' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#333', color: 'white' }}>
                                            <th>Col 1</th>
                                            <th>Col 2</th>
                                            <th>Col 3</th>
                                            <th>Col 4</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>H</td>
                                            <td>O</td>
                                            <td>L</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>M</td>
                                            <td>U</td>
                                            <td>N</td>
                                            <td>D</td>
                                        </tr>
                                        <tr>
                                            <td>O</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p style={{ marginBottom: '1.5rem' }}>
                                    El mensaje cifrado sería: <strong>"HMOOUNLD A"</strong>, tomando las letras de forma vertical, columna por columna.
                                </p>

                                <h4 className="subtitle">Proceso de Descifrado</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    Para descifrar el mensaje, se debe escribir el mensaje cifrado de forma vertical en columnas de acuerdo al número de filas utilizado originalmente y luego leer fila por fila para reconstruir el mensaje original.
                                </p>

                                <h4 className="subtitle">Ejemplo de Descifrado</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    Tomando el mensaje cifrado "HMOOUNLD A" y la clave de 4 columnas, lo reconstruimos de la siguiente manera:
                                </p>

                                <table className="table is-striped is-bordered" style={{ marginBottom: '1.5rem', backgroundColor: '#1f1f1f', color: 'white' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#333', color: 'white' }}>
                                            <th>Col 1</th>
                                            <th>Col 2</th>
                                            <th>Col 3</th>
                                            <th>Col 4</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>H</td>
                                            <td>O</td>
                                            <td>L</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>M</td>
                                            <td>U</td>
                                            <td>N</td>
                                            <td>D</td>
                                        </tr>
                                        <tr>
                                            <td>O</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p style={{ marginBottom: '1.5rem' }}>
                                    Leyendo fila por fila, obtenemos el mensaje original: <strong>"HOLA MUNDO"</strong>.
                                </p>

                                <h4 className="subtitle">Ventajas y Desventajas</h4>
                                <p style={{ marginBottom: '1rem' }}>
                                    <strong>Ventajas:</strong>
                                </p>
                                <ul style={{ marginBottom: '1.5rem' }}>
                                    <li>Es un método simple y fácil de entender.</li>
                                    <li>No requiere herramientas complejas.</li>
                                    <li>Puede utilizarse en situaciones donde no se necesita gran seguridad.</li>
                                </ul>

                                <p style={{ marginBottom: '1rem' }}>
                                    <strong>Desventajas:</strong>
                                </p>
                                <ul style={{ marginBottom: '1.5rem' }}>
                                    <li>Es vulnerable si se conoce el número de columnas.</li>
                                    <li>El cifrado puede ser descifrado fácilmente con prueba y error.</li>
                                    <li>No es adecuado para proteger información sensible o en entornos con alta seguridad.</li>
                                </ul>

                                <h4 className="subtitle">Guía de Uso</h4>
                                <p style={{ margin: '1rem' }}>
                                    <strong>Pasos para cifrar:</strong>
                                </p>
                                <ul>
                                    <li>1. Selecciona el número de columnas que deseas utilizar como clave.</li>
                                    <li>2. Escribe el mensaje que deseas cifrar en filas.</li>
                                    <li>3. Lee las letras verticalmente para obtener el mensaje cifrado.</li>
                                </ul>

                                <p style={{ margin: '1rem' }}>
                                    <strong>Pasos para descifrar:</strong>
                                </p>
                                <ul>
                                    <li>1. Identifica el número de columnas usado originalmente para cifrar el mensaje.</li>
                                    <li>2. Escribe el mensaje cifrado en columnas.</li>
                                    <li>3. Lee las letras fila por fila para recuperar el mensaje original.</li>
                                </ul>

                                <h4 className="subtitle" style={{ margin: '1rem' }}>Aplicaciones Modernas</h4>
                                <p>
                                    Aunque el cifrado Escítala no se usa hoy en día como una medida de seguridad avanzada, su principio de transposición ha influido en métodos de cifrado más modernos que usan la alteración del orden de los caracteres en combinación con otros métodos para aumentar la seguridad.
                                </p>

                                <h4 className="subtitle" style={{ margin: '1rem' }}>Más sobre el Cifrado Escítala</h4>
                                <p>
                                    Puedes aprender más sobre el cifrado Escítala y otros métodos de cifrado por transposición en el siguiente enlace:
                                    <a href="https://joseluistabaracarbajo.gitbooks.io/criptografia-clasica/content/Cripto03.html" target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue', marginLeft: '5px' }}>
                                        Wikipedia - Cifrado Escítala
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

export default CifradoEscitala;
