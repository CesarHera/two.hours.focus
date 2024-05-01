import React, { useState, useEffect } from 'react';
import './App.scss';

// Importar el sonido de notificación
import notificationSound from './notification.mp3';
import completeSound from './complete.mp3'; // Nuevo sonido para completar repeticiones

function App() {
  const [started, setStarted] = useState(false); // Estado para controlar si la aplicación ha comenzado
  const [time, setTime] = useState(7200); // 2 horas en segundos
  const [repsQueue, setRepsQueue] = useState([]); // Cola de repeticiones
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Color inicial: Blanco
  const [textColor, setTextColor] = useState('#333'); // Color de texto inicial: Negro

  // Función para manejar el clic del botón de inicio
  const handleStartButtonClick = () => {
    setStarted(true); // Establecer el estado de "started" a true cuando se hace clic en el botón
  };

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 0) {
            clearInterval(timer);
            return 0;
          }

          if ((7200 - prevTime) % 600 === 0) { // Cada 10 minutos (600 segundos)
            const newRepsQueue = [...repsQueue, { time: new Date(), completed: false }]; // Agregar nueva repetición a la cola
            setRepsQueue(newRepsQueue);
            playNotificationSound(); // Reproducir sonido de notificación
          }

          setBackgroundColor(generateRandomColor(prevTime));
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [started, repsQueue]); // Ejecutar el efecto solo cuando "started" o "repsQueue" cambien

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
  }, [backgroundColor, textColor]);

  const generateRandomColor = (prevTime) => {
    // Calcular la intensidad del color en función del tiempo restante
    const intensity = Math.round((7200 - prevTime) / 7200 * 255);
    const r = Math.floor(Math.random() * intensity);
    const g = Math.floor(Math.random() * intensity);
    const b = Math.floor(Math.random() * intensity);
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const backgroundLuminance = (0.299 * parseInt(backgroundColor.substr(1, 2), 16) +
                                 0.587 * parseInt(backgroundColor.substr(3, 2), 16) +
                                 0.114 * parseInt(backgroundColor.substr(5, 2), 16)) / 255;
    setTextColor(backgroundLuminance > 0.5 ? '#000' : '#FFF'); // Cambia el color del texto según la luminancia del fondo
  }, [backgroundColor]);

  const handleRepClick = (index) => {
    setRepsQueue(prevQueue => prevQueue.map((rep, i) => {
      if (i === index) {
        const newQueue = [...prevQueue];
        newQueue.splice(index, 1); // Eliminar la repetición completada
        setRepsQueue(newQueue);
        playCompleteSound(); // Reproducir sonido de completado
      }
      return rep;
    }));
  };

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.volume = 0.2; // Ajustar el volumen
    audio.play();
  };

  const playCompleteSound = () => {
    const audio = new Audio(completeSound);
    audio.volume = 0.2; // Ajustar el volumen
    audio.play();
  };

  return (
    <div className="app">
      {!started && (
        <div className={`app ${started ? 'started' : 'notStarted'}`}>
          <button className="start-button" onClick={handleStartButtonClick}>
            Comenzar
          </button>
        </div>
      )}
      {started && (
        <>
          <h1>Temporizador de Enfoque</h1>
          <div className="timer">{formatTime(time)}</div>
          <div className="reminder-container">
            {repsQueue.map((rep, index) => (
              <div key={index} className="reminder">
                ¡Hora de hacer 20 repeticiones! - {rep.time.toLocaleTimeString()}
                <span className="checkmark" onClick={() => handleRepClick(index)}>&#10003;</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App

const pad = (value) => {
  return value < 10 ? '0' + value : value;
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)} hrs`;
}
