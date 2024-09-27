import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Para manejar la navegación de "Atrás"
import './style.css';  // Asegúrate de tener un archivo CSS adicional

function CifradoCesar() {
  const [mensaje, setMensaje] = useState('');
  const [clave, setClave] = useState(0);
  const [resultado, setResultado] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Para controlar la visibilidad del modal
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  const navigate = useNavigate();  // Hook para navegar hacia atrás

  // Controlar el historial de navegación y cerrar el modal si está abierto
  useEffect(() => {
    const handlePopState = () => {
      if (modalVisible) {
        setModalVisible(false); // Cierra el modal si está abierto al presionar "Atrás"
      } else {
        navigate(-1); // Si el modal está cerrado, navega hacia atrás
      }
    };

    window.addEventListener('popstate', handlePopState); // Escuchar cambios en el historial

    return () => {
      window.removeEventListener('popstate', handlePopState); // Limpieza
    };
  }, [modalVisible, navigate]);

  const cifrarMensaje = () => {
    let cifrado = '';
    for (let i = 0; i < mensaje.length; i++) {
      let codigo = mensaje.charCodeAt(i);
      if (codigo >= 65 && codigo <= 90) {
        cifrado += String.fromCharCode(((codigo - 65 + parseInt(clave)) % 26) + 65);
      } else if (codigo >= 97 && codigo <= 122) {
        cifrado += String.fromCharCode(((codigo - 97 + parseInt(clave)) % 26) + 97);
      } else {
        cifrado += mensaje[i];
      }
    }
    setResultado(cifrado);
  };

  const descifrarMensaje = () => {
    let descifrado = '';
    for (let i = 0; i < mensaje.length; i++) {
      let codigo = mensaje.charCodeAt(i);
      if (codigo >= 65 && codigo <= 90) {
        descifrado += String.fromCharCode(((codigo - 65 - parseInt(clave) + 26) % 26) + 65);
      } else if (codigo >= 97 && codigo <= 122) {
        descifrado += String.fromCharCode(((codigo - 97 - parseInt(clave) + 26) % 26) + 97);
      } else {
        descifrado += mensaje[i];
      }
    }
    setResultado(descifrado);
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
    position: 'relative'
  };

  const boxStyle = {
    maxWidth: isMobile ? '380px' : '500px', // Ancho más pequeño en móviles
    width: '100%',
    padding: isMobile ? '1rem' : '2rem', // Padding más pequeño en móviles
    boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    backgroundColor: '#222222',
    marginTop: isMobile? '1rem': '0rem',

};

  const backButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1.2rem',
    cursor: 'pointer'
  };

  const buttonIconStyle = {
    marginRight: '5px'
  };

  const resultStyle = {
    backgroundColor: '#14161A',
    borderColor: resultado ? '#15C43B' : '#14161A',  // Solo bordes verdes si hay resultado
    color: resultado ? 'white' : 'black',
    padding: '1rem',
    borderRadius: '4px',
    border: '2px solid',
    width: '100%',
    marginTop: '1rem',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 className="title has-text-centered" style={{ color: 'white' }}>Cifrado César</h1>
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
              <i className="fas fa-key" style={buttonIconStyle}></i> Clave (desplazamiento)
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

          {/* Caja de texto para mostrar el resultado */}
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

{/* Enlace para mostrar la explicación del Cifrado César centrado */}
<div style={{ textAlign: 'center', marginTop: '20px' }}>
    <a
        href="javascript:void(0)"
        onClick={() => setModalVisible(true)}
        style={{
            color: 'lightblue',
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
            e.target.style.backgroundColor = '#2b2f38'; // Agregar fondo oscuro
        }}
        onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            e.target.style.color = 'lightblue'; // Vuelve al color original
            e.target.style.backgroundColor = 'transparent'; // Sin fondo
        }}
    >
        Acerca de Cifrado César
    </a>
</div>

{modalVisible && (
    <div className="modal is-active">
        <div className="modal-background" onClick={() => setModalVisible(false)}></div>
        <div className="modal-content">
            <div className="box" style={{ padding: '2rem' }}>
                <h2 className="title">¿Qué es el Cifrado César?</h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    El <strong>Cifrado César</strong>, también conocido como cifrado por desplazamiento, es uno de los cifrados más antiguos y simples que existen. Se utilizaba en la época del Imperio Romano, nombrado en honor a Julio César, quien lo usaba para enviar mensajes secretos a sus generales. Funciona desplazando cada letra del mensaje original un número fijo de posiciones en el alfabeto.
                </p>

                <h3 className="subtitle">¿Cómo funciona el Cifrado César?</h3>
                <p style={{ marginBottom: '1rem' }}>
                    El cifrado César es un tipo de cifrado por sustitución en el cual cada letra del mensaje se reemplaza por otra, desplazándola un número fijo de posiciones en el alfabeto. Por ejemplo, con un desplazamiento de 3, "A" se convierte en "D", "B" en "E", y así sucesivamente.
                </p>

                <h4 className="subtitle">Proceso de Cifrado</h4>
                <ol style={{ marginBottom: '1.5rem' }}>
                    <li>Selecciona un número para el desplazamiento (la clave).</li>
                    <li>Desplaza cada letra del mensaje original ese número de posiciones en el alfabeto.</li>
                    <li>Si alcanzas el final del alfabeto, empieza nuevamente desde la letra "A".</li>
                </ol>

                <h4 className="subtitle">Ejemplo de Cifrado</h4>
                <p style={{ marginBottom: '1rem' }}>
                    Supongamos que queremos cifrar el mensaje "HOLA" usando un desplazamiento de 3:
                </p>

                <table className="table is-striped is-bordered" style={{ marginBottom: '1.5rem', backgroundColor: '#1f1f1f', color: 'white' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#333', color: 'white' }}>
                            <th>Letra Original</th>
                            <th>Letra Cifrada (Desplazamiento de 3)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>H</td>
                            <td>K</td>
                        </tr>
                        <tr>
                            <td>O</td>
                            <td>R</td>
                        </tr>
                        <tr>
                            <td>L</td>
                            <td>O</td>
                        </tr>
                        <tr>
                            <td>A</td>
                            <td>D</td>
                        </tr>
                    </tbody>
                </table>

                <p style={{ marginBottom: '1.5rem' }}>
                    El mensaje cifrado sería: <strong>"KROD"</strong>.
                </p>

                <h4 className="subtitle">Proceso de Descifrado</h4>
                <p style={{ marginBottom: '1rem' }}>
                    Para descifrar el mensaje, simplemente desplaza las letras en sentido inverso usando el mismo número de desplazamiento (clave) que se usó para cifrarlo.
                </p>

                <h4 className="subtitle">Ejemplo de Descifrado</h4>
                <p style={{ marginBottom: '1rem' }}>
                    Si queremos descifrar "KROD" usando un desplazamiento de 3, retrocedemos 3 posiciones en el alfabeto:
                </p>

                <table className="table is-striped is-bordered" style={{ marginBottom: '1.5rem', backgroundColor: '#1f1f1f', color: 'white' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#333', color: 'white' }}>
                            <th>Letra Cifrada</th>
                            <th>Letra Original (Desplazamiento inverso de 3)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>K</td>
                            <td>H</td>
                        </tr>
                        <tr>
                            <td>R</td>
                            <td>O</td>
                        </tr>
                        <tr>
                            <td>O</td>
                            <td>L</td>
                        </tr>
                        <tr>
                            <td>D</td>
                            <td>A</td>
                        </tr>
                    </tbody>
                </table>

                <p style={{ marginBottom: '1.5rem' }}>
                    El mensaje descifrado sería: <strong>"HOLA"</strong>.
                </p>

                <h4 className="subtitle">Ventajas y Desventajas</h4>
                <p style={{ marginBottom: '1rem' }}>
                    <strong>Ventajas:</strong>
                </p>
                <ul style={{ marginBottom: '1.5rem' }}>
                    <li>Es extremadamente simple y fácil de implementar.</li>
                    <li>No requiere equipos complejos para su ejecución.</li>
                    <li>Es adecuado para fines educativos o para cifrar mensajes poco sensibles.</li>
                </ul>

                <p style={{ marginBottom: '1rem' }}>
                    <strong>Desventajas:</strong>
                </p>
                <ul style={{ marginBottom: '1.5rem' }}>
                    <li>Es vulnerable a ataques de fuerza bruta, ya que solo hay 25 posibles claves (desplazamientos).</li>
                    <li>No es seguro para la protección de información confidencial o importante.</li>
                    <li>Puede ser fácilmente descifrado si se conoce el método utilizado.</li>
                </ul>

                <h4 className="subtitle">Guía de Uso</h4>
                <p style={{ marginBottom: '1rem' }}>
                    <strong>Pasos para cifrar:</strong>
                </p>
                <ul>
                    <li>1. Elige un número de desplazamiento que servirá como clave.</li>
                    <li>2. Aplica ese desplazamiento a cada letra del mensaje, moviéndolas en el alfabeto.</li>
                    <li>3. Lee el mensaje cifrado resultante.</li>
                </ul>

                <p style={{ marginBottom: '1rem' }}>
                    <strong>Pasos para descifrar:</strong>
                </p>
                <ul>
                    <li>1. Usa el mismo número de desplazamiento (clave) que se usó para cifrar el mensaje.</li>
                    <li>2. Desplaza cada letra en sentido inverso para recuperar el mensaje original.</li>
                </ul>

                <h4 className="subtitle">Aplicaciones Modernas</h4>
                <p>
                    Aunque el cifrado César es demasiado simple para aplicaciones modernas de seguridad, sus principios se encuentran en muchos cifrados por sustitución utilizados hoy en día. Sin embargo, en la práctica, los sistemas criptográficos modernos usan claves mucho más largas y complejas para proteger datos.
                </p>

                <h4 className="subtitle">Más sobre el Cifrado César</h4>
                <p>
                    Puedes aprender más sobre el cifrado César y su historia en este enlace:
                    <a href="https://es.wikipedia.org/wiki/Cifrado_César" target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue', marginLeft: '5px' }}>
                        Wikipedia - Cifrado César
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

export default CifradoCesar;
