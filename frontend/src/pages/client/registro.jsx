import React from 'react';
import { useForm } from 'react-hook-form';
import { registrarUsuario } from '../../api/projectapi';
import { useNavigate } from 'react-router-dom';

export function Registro() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

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
      } else {
        console.error("Error en el registro");
        
      }
    } catch (error) {
      console.error("Error en el registro", error.response ? error.response.data : error.message);
      
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre:
          <input type="text" {...register('nombre', {/* required: true */})} />
          {/*errors.nombre && <p>El nombre es requerido</p>*/}
        </label>
        <br />
        <label>
          Apellido:
          <input type="text" {...register('apellido', { /*required: true */})} />
          {/*errors.apellido && <p>El apellido es requerido</p>*/}
        </label>
        <br />
        <label>
          Fecha de nacimiento:
          <input type="date" {...register('fecha_nacimiento', { /*required: true*/ })} />
          {/*errors.fecha_nacimiento && <p>La fecha de nacimiento es requerida</p>*/}
        </label>
        <br />
        <label>
          Cédula de Ciudadanía:
          <input type="number" {...register('cedula', { /*required: true */})} />
          {/*errors.cedula && <p>La cédula es requerida</p>*/}
        </label>
        <br />
        <label>
          Domicilio:
          <input type="text" {...register('domicilio', {/* required: true*/ })} />
          {/*errors.domicilio && <p>El domicilio es requerido</p>*/}
        </label>
        <br />
        <label>
          Teléfono:
          <input type="number" {...register('telefono', { /*required: true*/ })} />
          {/*errors.telefono && <p>El teléfono es requerido</p>*/}
        </label>
        <br />
        <label>
          Correo:
          <input type="email" {...register('email', { /*required: true */})} />
          {/*errors.email && <p>El correo es requerido</p>*/}
        </label>
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
