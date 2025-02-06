import React, { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const renderHourMarks = () => {
    const marks = [];
    for (let i = 0; i < 12; i++) {
      marks.push(
        <div
          key={i}
          className="hour-mark"
          style={{ transform: `rotate(${i * 30}deg) translateY(-90px)` }}
        ></div>
      );
    }
    return marks;
  };

  return (
    <div className="clock">
      {renderHourMarks()}
      <div className="dot"></div>
      <div
        className="hour-hand"
        style={{ transform: `rotateZ(${time.getHours() * 30}deg)` }}
      ></div>
      <div
        className="minute-hand"
        style={{ transform: `rotateZ(${time.getMinutes() * 6}deg)` }}
      ></div>
      <div
        className="second-hand"
        style={{ transform: `rotateZ(${time.getSeconds() * 6}deg)` }}
      ></div>
    </div>
  );
}

export default Clock;
