// TimerControls.jsx
import React, { useState, useEffect } from 'react';
import "../src/TimerControls.css"
import {HiMiniPlay,HiMiniStop} from 'react-icons/hi2';
import {MdDeleteOutline} from 'react-icons/md';

function TimerControls({ elapsed, isRunning, startTimer, stopTimer, calculateAmount, updateElapsed, deleteTimer }) {
  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        updateElapsed(); // Mise à jour du chronomètre
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning]);
  const [nameClient, SetNameClient] = useState('')

  return (
    <div className='client'>
      <input type="text" placeholder='Nom du client' name="" id="text" value={nameClient} onChange={(e)=> SetNameClient(e.target.value)} />
      <div className="timer">{displayTime(elapsed)}</div>
      <button className='bt' onClick={startTimer} disabled={isRunning}>
      Play
      </button>
      <button className='bt' onClick={stopTimer} disabled={!isRunning}>
      Stop
      </button>
      <p className='montant'>
        <span>{calculateAmount()} Ar</span>
      </p>
      <MdDeleteOutline  onClick={deleteTimer} className='deleteBt' style={{width:'30px', height: '30px'}}/>
    </div>
  );
}

function displayTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${String(minutes).padStart(3, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default TimerControls;
