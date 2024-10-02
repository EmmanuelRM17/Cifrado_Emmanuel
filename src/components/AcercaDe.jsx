import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AcercaDe.css';  // Asegúrate de tener un archivo CSS adicional

function AcercaDe() {
    const navigate = useNavigate();

    const backButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '1.2rem',
        cursor: 'pointer',
        marginTop:'35px',
    };

    const buttonIconStyle = {
        marginRight: '5px',
    };

    return (
        <div>
            <div className="acerca-de-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#14161A', color: '#ffffff', position: 'relative' }}>
                <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '900px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Acerca de Encryptione</h1>

                    <div className="info-cards animacion-div" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <div className="info-card" style={{ backgroundColor: '#333', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', }}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>Nuestra Misión</h2>
                            <p>
                                El objetivo de Encryptione es ofrecer una plataforma educativa para enseñar los fundamentos del cifrado y su importancia en la protección de la información digital. Buscamos crear una comunidad donde los usuarios puedan aprender y aplicar técnicas modernas de criptografía.
                            </p>
                        </div>

                        <div className="info-card" style={{ backgroundColor: '#333', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem',  }}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>Educación y Seguridad</h2>
                            <p>
                                Encryptione se enfoca en brindar acceso a herramientas y recursos que permiten a los usuarios entender cómo proteger su información en un mundo digital. Desde principiantes hasta expertos, nuestra plataforma cubre desde los cifrados básicos hasta las técnicas más avanzadas.
                            </p>
                        </div>

                        <div className="info-card" style={{ backgroundColor: '#333', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem',  }}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>El Futuro del Cifrado</h2>
                            <p>
                                Nuestra visión es ser una referencia en educación sobre criptografía, ofreciendo recursos actualizados y adecuados a los avances tecnológicos. Desde la criptografía tradicional hasta los métodos de cifrado basados en inteligencia artificial, CifradoTech está en constante evolución.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcercaDe;
