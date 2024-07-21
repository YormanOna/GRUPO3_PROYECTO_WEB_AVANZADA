import React from 'react';
import { useForm } from 'react-hook-form';
import { validarUsuario } from '../api/projectapi';
import { useNavigate } from 'react-router-dom';

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
          navigate('/'); 
        } else {
          console.error('Error en la autenticación');
          alert('Usuario o contraseña incorrectos');
        }
      } else {
        console.error('Error en la autenticación');
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la autenticación', error);
      alert('Error en la autenticación');
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Usuario:
          <input type="text" name="nombreUsuario" 
            {...register('nombreUsuario', { required: true })}
          />
          {errors.nombreUsuario && <p>El usuario es requerido</p>}
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" 
            {...register('password', { required: true })}
          />
          {errors.password && <p>La contraseña es requerida</p>}
        </label>
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}