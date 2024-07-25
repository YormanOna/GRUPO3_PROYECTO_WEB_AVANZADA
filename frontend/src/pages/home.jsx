import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../styles/home.css";

import Cocteles1 from '../images/Cocteles1.jpg';
import Cocteles2 from '../images/Cocteles2.jpg';
import Cocteles3 from '../images/Cocteles3.jpg';
import Cocteles4 from '../images/Cocteles4.jpg';
import logo from '../images/logo.png';

export function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <img src={logo} alt="logo 1" />
        <div>
          <h1>Banana's Cocktails</h1>
          <p className="subheading">Servicio de Bartender y Catering</p>
        </div>
        <Link to="/login" className="register-button">Iniciar sesión</Link>
      </header>
      <div className="content">
        <div className="carousel">
          <Carousel
            autoPlay
            interval={2000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img src={Cocteles1} alt="Imagen 1" />
            </div>
            <div>
              <img src={Cocteles2} alt="Imagen 2" />
            </div>
            <div>
              <img src={Cocteles3} alt="Imagen 3" />
            </div>
            <div>
              <img src={Cocteles4} alt="Imagen 3" />
            </div>
          </Carousel>
        </div>
        <div className="info">
          <h2>Información</h2>
          <p>Texto informativo sobre las imágenes o cualquier otro contenido relevante.</p>
        </div>
      </div>
      <footer className='footer'>
        <p>&copy; 2024 Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
