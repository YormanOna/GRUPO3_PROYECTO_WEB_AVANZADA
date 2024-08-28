import React, { useState } from 'react';
import '../../styles/calendario.css';

export function Calendario() {
  const barName = "Bananas Cocktails";
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const availability = [
    { date: "2023-06-01", status: "disponible" },
    { date: "2023-06-02", status: "reservado" },
    { date: "2023-06-03", status: "disponible" },
    { date: "2023-06-04", status: "reservado" },
    { date: "2023-06-05", status: "disponible" },
    { date: "2023-06-06", status: "reservado" },
    { date: "2023-06-07", status: "disponible" },
    { date: "2023-06-08", status: "reservado" },
    { date: "2023-06-09", status: "disponible" },
    { date: "2023-06-10", status: "reservado" },
    { date: "2023-06-11", status: "disponible" },
    { date: "2023-06-12", status: "reservado" },
    { date: "2023-06-13", status: "disponible" },
    { date: "2023-06-14", status: "reservado" },
    { date: "2023-06-15", status: "disponible" },
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para guardar la reserva con fecha y hora
    alert(`Reserva confirmada para ${selectedDate} a las ${selectedTime}`);
    setModalVisible(false);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const startDate = new Date(availability[0].date);
  const startDay = startDate.getDay();

  return (
    <div className="bg-backgroundCL text-foregroundCL">
      <header className="headerCL">
        <div className="flexCL">
          <div className="gap-4CL">
            <img
              src="https://i.pinimg.com/originals/46/09/7c/46097ce4f245a1e5d767033fed857dfd.png"
              alt={barName}
              width={60}
              height={60}
              style={{ aspectRatio: "40/40", objectFit: "cover" }}
            />
            <h1 className="text-2xlCL">{barName}</h1>
          </div>
          <button className="buttonCL secondaryCL">Reserva ahora</button>
        </div>
      </header>
      <main className="mainCL">
        <div className="gridCL grid-cols-7CL">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-headerCL">
              {day}
            </div>
          ))}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={index} className="cardCL emptyCL"></div>
          ))}
          {availability.map((day) => (
            <div
              key={day.date}
              className={`cardCL ${day.status === "disponible" ? "availableCL" : "bookedCL"}`}
              onClick={() => day.status === "disponible" && handleDateSelect(day.date)}
            >
              <div className="text-centerCL font-mediumCL">
                {new Date(day.date).getDate()}
              </div>
              {day.status === "reservado" && (
                <div className="mt-2CL text-xsCL font-mediumCL text-errorCL">Reservado</div>
              )}
              {day.status === "disponible" && (
                <div className="mt-2CL text-xsCL font-mediumCL text-successCL">Disponible</div>
              )}
            </div>
          ))}
        </div>
        <div className="legendCL">
          <div className="itemCL">
            <div className="circleCL availableCL"></div>
            <span>Disponible</span>
          </div>
          <div className="itemCL">
            <div className="circleCL bookedCL"></div>
            <span className="span_rojoCL">Reservado</span>
          </div>
        </div>
        {modalVisible && (
          <div className="modalCL">
            <div className="modal-contentCL">
              <h2 className="text-lgCL">Reserva para {new Date(selectedDate).toLocaleDateString()}</h2>
              <div className="mt-4CL">
                <label className="blockCL">Selecciona la hora:</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="inputCL"
                />
              </div>
              <div className="mt-4CL flexCL gap-2CL">
                <button onClick={handleSubmit} className="buttonCL primaryCL">Confirmar</button>
                <button onClick={() => setModalVisible(false)} className="buttonCL secondaryCL">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
