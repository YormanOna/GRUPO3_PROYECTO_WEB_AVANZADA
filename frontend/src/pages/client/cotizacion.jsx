import React, { useState } from "react";
import "../../styles/cotizacion.css";
import butterup from "butteruptoasts";
import "../../styles/butterup-2.0.0/butterup.css";

export function Cotizacion() {
  const [cocteles, setCocteles] = useState([
    { id: 1, nombre: "Mojito", descripcion: "Refrescante bebida con menta", precio: 10 },
    { id: 2, nombre: "Margarita", descripcion: "Cóctel clásico con tequila", precio: 12 },
    { id: 3, nombre: "Caipirinha", descripcion: "Cóctel brasileño con cachaça", precio: 15 },
  ]);

  const [seleccionados, setSeleccionados] = useState({});
  const [cantidad, setCantidad] = useState({});
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [direccion, setDireccion] = useState("");
  const [mostrarCotizacion, setMostrarCotizacion] = useState(false);
  const [extras, setExtras] = useState({
    dj: false,
    mobiliario: false,
    lugar: false,
  });

  const handleGenerarCotizacion = () => {
    // Verificar si los campos básicos están completos
    if ( !fecha || !direccion) {
        butterup.toast({
            title: "¡Error!",
            message: "Por favor complete todos los campos requeridos.",
            location: "top-right",
            icon: false,
            dismissable: true,
            type: "error",
        });
        setMostrarCotizacion(false);
        return false; // Indicating failure
    }

    // Verificar si al menos un cóctel está seleccionado y tiene cantidad mayor a cero
    const coctelSeleccionado = cocteles.some((coctel) => seleccionados[coctel.id] && cantidad[coctel.id] > 0);

    if (!coctelSeleccionado) {
        butterup.toast({
            title: "¡Error!",
            message: "Por favor seleccione al menos un cóctel y especifique una cantidad válida.",
            location: "top-right",
            icon: false,
            dismissable: true,
            type: "error",
        });
        setMostrarCotizacion(false);
        return false; // Indicating failure
    }

    // Si todo está correcto, permitir mostrar la cotización
    setMostrarCotizacion(true);
    return true; // Indicating success
};

  const calcularCostoEstimado = () => {
    let costoTotal = 0;
    cocteles.forEach((coctel) => {
      if (seleccionados[coctel.id] && cantidad[coctel.id]) {
        costoTotal += coctel.precio * cantidad[coctel.id];
      }
    });

    if (extras.dj) costoTotal += 200;
    if (extras.mobiliario) costoTotal += 150;
    if (extras.lugar) costoTotal += 300;

    return costoTotal;
  };

  const handleEnviarReserva = async () => {

    const costoTotal = calcularCostoEstimado();

    const reserva = {
      servicio,
      fecha,
      direccion,
      cocteles: JSON.stringify(
        cocteles.map((coctel) => ({
          nombre: coctel.nombre,
          cantidad: Number(cantidad[coctel.id]),
        }))
      ),
      extras,
      costo_estimado: parseFloat(costoTotal).toFixed(2),
    };

    console.log("Datos de reserva:", reserva);

    try {
      // Aquí puedes llamar a la función de API si la tienes
      // await guardarReserva(reserva);

      butterup.toast({
        title: "¡Éxito!",
        message: "La reserva se ha guardado correctamente.",
        location: "top-right",
        icon: false,
        dismissable: true,
        type: "success",
      });

      ResetForm();
      setMostrarCotizacion(false);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Detalles del error:", error.response.data);
        butterup.toast({
          title: "¡Error!",
          message: `Error al guardar la reserva: ${JSON.stringify(error.response.data)}`,
          location: "top-right",
          icon: false,
          dismissable: true,
          type: "error",
        });
      } else {
        console.error("Error al guardar la reserva:", error);
        butterup.toast({
          title: "¡Error!",
          message: "Error desconocido al guardar la reserva.",
          location: "top-right",
          icon: false,
          dismissable: true,
          type: "error",
        });
      }
    }
  };

  const ResetForm = () => {
    setServicio("");
    setFecha("");
    setDireccion("");
    setSeleccionados({});
    setCantidad({});
    setExtras({
      dj: false,
      mobiliario: false,
      lugar: false,
    });
  };

  return (
    <div>
      {!mostrarCotizacion ? (
        <div className="bodyC">
          <div className="containerC">
            <h1 className="titleC">¡Bienvenido a nuestra sección de Cotización Automática!</h1>
            <div className="sectionC">
              <h2 className="section-titleC">Servicio</h2>
              <select
                className="inputC"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
              >
                <option value="" disabled>
                  Tipo de evento
                </option>
                <option value="Bartender">Bartender</option>
                <option value="Catering">Catering</option>
              </select>
            </div>
            <div className="sectionC">
              <h2 className="section-titleC">Fecha y hora</h2>
              <input
                type="datetime-local"
                className="inputC"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className="sectionC">
              <h2 className="section-titleC">Dirección</h2>
              <input
                className="inputC"
                placeholder="Dirección del evento"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="sectionC">
              <h2 className="section-titleC">Detalles del servicio</h2>
              <div className="border-boxC">
                <h3 className="section-titleC">Bebidas</h3>
                <div className="gridC grid-3-colsC">
                  {cocteles.map((coctel) => (
                    <div className="coctel-cardC" key={coctel.id}>
                      <div className="coctel-infoC">
                        <input
                          type="checkbox"
                          id={`coctel-${coctel.id}`}
                          checked={!!seleccionados[coctel.id]}
                          onChange={() =>
                            setSeleccionados((prev) => ({
                              ...prev,
                              [coctel.id]: !prev[coctel.id],
                            }))
                          }
                        />
                        <label
                          htmlFor={`coctel-${coctel.id}`}
                          className="checkbox-labelC"
                        >
                          {coctel.nombre}
                        </label>
                        <p className="coctel-descripcionC">
                          {coctel.descripcion}
                        </p>
                        <p className="coctel-precioC">
                          Precio: ${coctel.precio}
                        </p>
                        {seleccionados[coctel.id] && (
                          <div className="coctel-quantityC">
                            <label
                              htmlFor={`cantidad-${coctel.id}`}
                              className="cantidad-labelC"
                            >
                              Cantidad:
                            </label>
                            <input
                              type="number"
                              id={`cantidad-${coctel.id}`}
                              min="0"
                              className="input-cantidadC"
                              value={cantidad[coctel.id] || 0}
                              onChange={(e) =>
                                setCantidad((prev) => ({
                                  ...prev,
                                  [coctel.id]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="noteC">
                  Nota: Recuerde que entre más cócteles seleccione, mayor será el
                  valor de la cotización.
                </p>
              </div>
              <div className="border-boxC">
                <h3 className="section-titleC">Extras</h3>
                <div className="gridC grid-3-colsC">
                  <div className="flex-centerC">
                    <input
                      type="checkbox"
                      id="dj"
                      checked={extras.dj}
                      onChange={(e) =>
                        setExtras((prev) => ({
                          ...prev,
                          dj: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor="dj" className="checkbox-labelC">
                      DJ - $200
                    </label>
                  </div>
                  <div className="flex-centerC">
                    <input
                      type="checkbox"
                      id="mobiliario"
                      checked={extras.mobiliario}
                      onChange={(e) =>
                        setExtras((prev) => ({
                          ...prev,
                          mobiliario: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor="mobiliario" className="checkbox-labelC">
                      Mobiliario - $150
                    </label>
                  </div>
                  <div className="flex-centerC">
                    <input
                      type="checkbox"
                      id="lugar"
                      checked={extras.lugar}
                      onChange={(e) =>
                        setExtras((prev) => ({
                          ...prev,
                          lugar: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor="lugar" className="checkbox-labelC">
                      Lugar - $300
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className="generate-quote-btnC" onClick={handleGenerarCotizacion}>
              Generar Cotización
            </button>
          </div>
        </div>
      ) : (
        <div className="quote-sectionC">
          <h2 className="section-titleC">Cotización</h2>
          <p>
            Servicio: <strong>{servicio}</strong>
          </p>
          <p>
            Fecha y hora: <strong>{fecha}</strong>
          </p>
          <p>
            Dirección: <strong>{direccion}</strong>
          </p>
          <h3>Cocteles Seleccionados:</h3>
          {cocteles.map((coctel) =>
            seleccionados[coctel.id] && cantidad[coctel.id] ? (
              <p key={coctel.id}>
                {coctel.nombre} - Cantidad: {cantidad[coctel.id]}
              </p>
            ) : null
          )}
          <h3>Extras:</h3>
          {extras.dj && <p>DJ - $200</p>}
          {extras.mobiliario && <p>Mobiliario - $150</p>}
          {extras.lugar && <p>Lugar - $300</p>}
          <h3>Costo Estimado: ${calcularCostoEstimado()}</h3>
          <button className="send-reservation-btnC" onClick={handleEnviarReserva}>
            Enviar Reserva
          </button>
          <button className="go-back-btnC" onClick={() => setMostrarCotizacion(false)}>
            Volver
          </button>
        </div>
      )}
    </div>
  );
}
