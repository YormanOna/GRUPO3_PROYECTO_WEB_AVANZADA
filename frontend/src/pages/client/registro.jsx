import React from 'react';
import { useForm } from 'react-hook-form';
import { registrarUsuario } from '../../api/projectapi';
import { useNavigate } from 'react-router-dom';
import butterup from 'butteruptoasts';
import '../../styles/butterup-2.0.0/butterup.css';
import '../../styles/registro.css';


export function Registro() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];
  const minDate = '1900-01-01';

  const validateFechaNacimiento = (value) => {
    const fechaNacimiento = new Date(value);
    const fechaMinima = new Date(minDate);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mesDiferencia = fechaActual.getMonth() - fechaNacimiento.getMonth();

    if (fechaNacimiento < fechaMinima) {
      return 'La fecha de nacimiento no puede ser anterior al año 1900';
    }

    if (edad < 18 || (edad === 18 && mesDiferencia < 0) || (edad === 18 && mesDiferencia === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
      return 'Debe tener al menos 18 años';
    }

    return true;
  };

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);
    
    const processedData = {
      ...data,
      cedula: parseInt(data.cedula, 10),
      telefono: parseInt(data.telefono, 10),
      fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString().split('T')[0] 
    };

    try {
      const response = await registrarUsuario(processedData);
      console.log("Usuario registrado", response);
      if (response.status === 201) {
        navigate('/login');
        butterup.toast({
          title: '🎉 ¡Hurra!',
          message: 'Datos ingresado.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'success',
        });
      } else {
        console.error("Error en el registro");
        
      }
    } catch (error) {
      console.error("Error en el registro", error.response ? error.response.data : error.message);
      
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit(onSubmit)} className="registro-form">
      <h1 className='titulo'>Registro de usuario</h1>
        <label>
        Nombre:
        <input 
          type="text" 
          {...register('nombre', {
            required: 'El nombre es requerido',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Solo se permiten letras"
            }
          })} 
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}
        </label>

        <label>
        Apellido:
        <input 
          type="text" 
          {...register('apellido', {
            required: 'El apellido es requerido',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Solo se permiten letras"
            }
          })} 
        />
        {errors.apellido && <p>{errors.apellido.message}</p>}
        </label>
        
        <label>
          Fecha de nacimiento:
          <input 
            type="date" 
            {...register('fecha_nacimiento', {
              required: 'La fecha de nacimiento es requerida',
              validate: validateFechaNacimiento
            })} 
            min={minDate}
            max={maxDate}
          />
          {errors.fecha_nacimiento && <p>{errors.fecha_nacimiento.message}</p>}
        </label>
        
        <label>
          Cédula de Ciudadanía:
          <input 
            type="number" 
            {...register('cedula_ciudadania', {
              required: 'El número de cédula es requerido'
            })} 
            min={0}
          />
          {errors.cedula_ciudadania && <p>{errors.cedula_ciudadania.message}</p>}
        </label>
        
        <label>
          Domicilio:
          <input type="text" {...register('domicilio', {required: true})} />
          {errors.domicilio && <p>El domicilio es requerido</p>}
        </label>
        
        <label>
          Teléfono:
          <input 
            type="number" 
            {...register('telefono', {
              required: 'El número de teléfono es requerido'
            })} 
            min={0}
          />
          {errors.telefono && <p>{errors.telefono.message}</p>}
        </label>
        
        <label>
          Correo:
          <input type="email" {...register('email', { required: true })} />
          {errors.email && <p>El correo es requerido</p>}
        </label>
        <br />
        <button type="submit" className="registro-button">Registrarse</button>
      </form>
    </div>
  );
}
