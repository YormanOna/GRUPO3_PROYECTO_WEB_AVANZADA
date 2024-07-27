import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validarUsuario } from '../api/projectapi';
import { useNavigate } from 'react-router-dom';
import {Registro} from './client/registro';
import butterup from 'butteruptoasts';
import '../styles/butterup-2.0.0/butterup.css';
import '../styles/login.css';
import InicioImg from '../images/INICIO.png';
import RegistroImg from '../images/registro.png';

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await validarUsuario(data);
      console.log(res);  // Imprime la respuesta completa de la API

      if (res.status === 200) {
        const users = res.data;
        const user = users.find(user => 
          user.nombreUsuario === data.nombreUsuario && 
          user.password === data.password
        );

        if (user) {
          console.log('Usuario autenticado:', user);
          butterup.toast({
            title: '🎉 ¡Hurra!',
            message: 'Su ingreso fue exitoso.',
            location: 'top-right',
            icon: false,
            dismissable: true,
            type: 'success',
          });

          // Esperar unos segundos antes de redirigir
          setTimeout(() => {
            navigate('/');
          }, 1000); // 2000 ms = 2 segundos

        } else {
          console.error('Error en la autenticación');
          butterup.toast({
            title: '¡Oh!',
            message: 'Usuario o contraseña incorrectos.',
            location: 'top-right',
            icon: false,
            dismissable: true,
            type: 'error',
          });
        }
      } else {
        console.error('Error en la autenticación');
        butterup.toast({
          title: '¡Oh!',
          message: 'Usuario o contraseña incorrectos.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error en la autenticación', error);
      butterup.toast({
        title: '¡Error!',
        message: 'Ocurrió un error en la autenticación.',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'error',
      });
    }
  });

  useEffect(() => {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });

    return () => {
      sign_up_btn.removeEventListener('click', () => {
        container.classList.add('sign-up-mode');
      });

      sign_in_btn.removeEventListener('click', () => {
        container.classList.remove('sign-up-mode');
      });
    };
  }, []);

  return (
    <div>
      <div className='container'>
        <div className='forms-contanier'>
          <div className='signin-signup'>
            <form className='sign-in-form' onSubmit={onSubmit}>
              <h2 className='titleNew'>Sig in</h2>
              <div className='input-field'>
                <i className="fa-solid fa-user"></i>
                <input type="text" 
                placeholder='Usuario'
                {...register('nombreUsuario', { required: 'El usuario es requerido' })}
                />
                {errors.nombreUsuario && <p className='errors'>{errors.nombreUsuario.message}</p>}
              </div>
              <div className='input-field'>
                <i className="fa-solid fa-lock"></i>
                <input type="password" 
                placeholder='Password'
                {...register('password', { required: 'La contraseña es requerida' })}
                />
                {errors.password && <p className='errors'>{errors.password.message}</p>}
              </div>
              <input type='submit' value='Login' className='btn solid' />
              <p className='social-text'>Utiliza otras formas de ingresar</p>
              <div className='social-media'>
                <a className='social-icon'>
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a className='social-icon'>
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a className='social-icon'>
                  <i className="fa-brands fa-google"></i>
                </a>
                <a className='social-icon'>
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </form>

            <Registro />
          </div>
          
        </div>

        <div className='panels-container'>
          <div className='panel left-panel'>
            <div className='contenido'>
              <h3>¿Eres nuevo?</h3>
              <p>
                Regístrate y comienza a disfrutar de nuestros servicios.
              </p>
              <button className='btn transparent' id='sign-up-btn'>
                Regístrate
              </button>
            </div>

            <img src={InicioImg} className='image' alt='' />
          </div>

          <div className='panel right-panel'>
            <div className='contenido'>
              <h3>¿Ya tienes una cuenta?</h3>
              <p>
                Ingresa con tu usuario y contraseña.
              </p>
              <button className='btn transparent' id='sign-in-btn'>
                Ingresar
              </button>
            </div>

            <img src={RegistroImg} className='image' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}