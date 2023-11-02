// App.jsx
import React, { useState, useEffect } from 'react';
import TimerControls from './TimerControls';
import '../src/App.css';
import Profil from '../src/assets/finona.png';
import {AiOutlineAppstoreAdd} from 'react-icons/ai'

export default function App() {
  const [timers, setTimers] = useState([{ id: 1, elapsed: 0, isRunning: false }]);
  const [nextTimerId, setNextTimerId] = useState(2);

  const addTimer = () => {
    setTimers((prevTimers) => [
      ...prevTimers,
      { id: nextTimerId, elapsed: 0, isRunning: false },
    ]);
    setNextTimerId(nextTimerId + 1);
  };

  const startTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      )
    );
  };

  const stopTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );
  };
  const deleteTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.filter((timer) => timer.id !== id)
    );
  };
  

  const updateElapsed = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, elapsed: timer.elapsed + 1000 } : timer
      )
    );
  };

  const calculateAmount = (elapsed) => {
    const pricePerMinute = 17;
    return ((elapsed / 60000) * pricePerMinute).toFixed(2);
  };

  return (
    <div className='App'>
      <div className="title">
        <img src={Profil} alt="" style={{width:'70px', height:'70px'}} />
        <h3>noantsoa</h3>
      </div>
      <h1>Facturation wifi</h1>
      <p>Chronométrez la durée de la connexion du client WiFi et facturez à la fin.</p>
      <div className="liste">
      {timers.map((timer) => (
        <TimerControls
          key={timer.id}
          elapsed={timer.elapsed}
          isRunning={timer.isRunning}
          startTimer={() => startTimer(timer.id)}
          stopTimer={() => stopTimer(timer.id)}
          calculateAmount={() => calculateAmount(timer.elapsed)}
          updateElapsed={() => updateElapsed(timer.id)}
          deleteTimer={() => deleteTimer(timer.id)}
        />
      ))}</div>

      <AiOutlineAppstoreAdd onClick={addTimer} style={{width:'30px', height:'30px', cursor:'pointer'}}/>
    </div>
  );
}

