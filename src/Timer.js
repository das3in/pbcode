import React from 'react';

const Timer = ({secondsRemaining, startTimer, stopTimer, timerActive}) => (
  <div className="text-center">
    <h3>{Math.floor(secondsRemaining / 60)}:{secondsRemaining % 60}</h3>
    <button className="btn btn-success"
      onClick={startTimer} 
    disabled={timerActive ? true : false}>Start Timer</button>
    <button disabled={timerActive ? false : true} className="btn btn-danger" onClick={stopTimer}>Stop Timer</button>
  </div>
)
export default Timer;
