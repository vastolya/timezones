import { useEffect, useState } from "react";
import "./Clock.css";

interface ClockProps {
  offset: number;
}
function Clock({ offset }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  });

  const adjustedTime = new Date(time.getTime() + offset * 60 * 60 * 1000);

  const formattedTime = `${adjustedTime.getHours() % 12}:${adjustedTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${adjustedTime
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

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
        style={{ transform: `rotateZ(${adjustedTime.getHours() * 30}deg)` }}
      ></div>
      <div
        className="minute-hand"
        style={{ transform: `rotateZ(${adjustedTime.getMinutes() * 6}deg)` }}
      ></div>
      <div
        className="second-hand"
        style={{ transform: `rotateZ(${adjustedTime.getSeconds() * 6}deg)` }}
      ></div>
      <div className="time-display">{formattedTime}</div>
    </div>
  );
}

export default Clock;
