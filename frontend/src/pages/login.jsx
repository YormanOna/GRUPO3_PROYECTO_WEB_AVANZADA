import React from 'react';
import { useForm } from 'react-hook-form';
import { validarUsuario } from '../api/projectapi';
import { useNavigate } from 'react-router-dom';
import butterup from 'butteruptoasts';
import '../styles/butterup-2.0.0/butterup.css';
import '../styles/login.css';

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

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <label>
          Usuario:
          <input type="text" 
            {...register('nombreUsuario', { required: 'El usuario es requerido' })}
          />
          {errors.nombreUsuario && <p>{errors.nombreUsuario.message}</p>}
        </label>
        <label>
          Contraseña:
          <input type="password" 
            {...register('password', { required: 'La contraseña es requerida' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <label>
          ¿No tienes cuenta?
          <a href="/registro"> Regístrate</a>
        </label>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}