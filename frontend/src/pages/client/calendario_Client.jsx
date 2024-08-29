import React, { useState, useEffect } from 'react';
import { obtenerReservas } from '../../api/projectapi';
import '../../styles/calendario.css';

export function Calendario() {
  const barName = "Bananas Cocktails";
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const [reservas, setReservas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        // Asumimos que obtenerReservas acepta parámetros de mes y año
        const res = await obtenerReservas(currentMonth + 1, currentYear);
        setReservas(res.data);
      } catch (error) {
        setError("Error al obtener las reservas");
        console.error("Error al obtener las reservas", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, [currentMonth, currentYear]);

  const handleDateSelect = (date) => {
    const reservation = reservas.find((reserva) => reserva.fecha === date);
    if (reservation) {
      alert('Esta fecha ya está reservada.');
    } else {
      setSelectedDate(date);
      // Aquí puedes agregar la lógica para manejar la selección de una fecha disponible
      // Por ejemplo, redirigir a una página de reserva o mostrar más información
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    const dateString = date.toISOString().split('T')[0];
    const isReserved = reservas.some(reserva => reserva.fecha === dateString);
    return { date, dateString, isReserved };
  });

  return (
    <div className="cl-calendar-container">
      <header className="cl-header">
        <div className="cl-header-content">
          <img
            src="https://i.pinimg.com/originals/46/09/7c/46097ce4f245a1e5d767033fed857dfd.png"
            alt={barName}
            className="cl-bar-image"
            onError={(e) => (e.target.style.display = 'none')} 
          />
          <h1 className="cl-bar-name">{barName}</h1>
          <button className="cl-reserve-button">
            Reserva ahora
          </button>
        </div>
      </header>
      <main className="cl-main-content">
        <section className="cl-calendar-section">
          {isLoading ? (
            <p className="cl-loading-text">Cargando...</p>
          ) : error ? (
            <p className="cl-error-text">{error}</p>
          ) : (
            <div className="cl-calendar">
              <div className="cl-calendar-nav">
                <button className="cl-nav-button" onClick={handlePrevMonth}>Anterior</button>
                <span className="cl-current-month">{firstDayOfMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
                <button className="cl-nav-button" onClick={handleNextMonth}>Siguiente</button>
              </div>
              <div className="cl-days-of-week">
                {daysOfWeek.map((day) => (
                  <div key={day} className="cl-day-name">
                    {day}
                  </div>
                ))}
              </div>
              <div className="cl-days-grid">
                {Array.from({ length: startDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="cl-empty-day"></div>
                ))}
                {calendarDays.map(({ date, dateString, isReserved }) => (
                  <div
                    key={dateString}
                    className={`cl-day ${isReserved ? "cl-reserved" : "cl-available"}`}
                    onClick={() => !isReserved && handleDateSelect(dateString)}
                  >
                    <span className="cl-day-number">{date.getDate()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <section className="cl-info-section">
          <div className="cl-info-box">
            <h2 className="cl-info-title">Información de reserva</h2>
            {selectedDate && (
              <div>
                <p className="cl-info-text">Fecha seleccionada: {new Date(selectedDate).toLocaleDateString()}</p>
                <p className="cl-info-text">Esta fecha está disponible para reserva.</p>
                {/* Aquí puedes agregar un enlace o botón para iniciar el proceso de reserva */}
              </div>
            )}
            {!selectedDate && (
              <p className="cl-info-text">Selecciona una fecha en el calendario para ver más información.</p>
            )}
          </div>
        </section>
      </main>
      <footer className="cl-footer">
        <div className="cl-footer-content">
          <div className="cl-status-item">
            <div className="cl-status-indicator cl-available-indicator"></div>
            <span>Disponible</span>
          </div>
          <div className="cl-status-item">
            <div className="cl-status-indicator cl-reserved-indicator"></div>
            <span>Reservado</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
