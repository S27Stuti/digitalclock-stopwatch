import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // Digital Clock
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Stopwatch
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatStopwatch = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="app">
      <div className="container">

        <h1>⏰ Digital Clock</h1>

        <div className="clock">
          {time.toLocaleTimeString()}
        </div>

        <h1 className="stopwatch-title">⏱ Stopwatch</h1>

        <div className="stopwatch">
          {formatStopwatch()}
        </div>

        <div className="buttons">
          <button
            className="start-btn"
            onClick={() => setRunning(true)}
          >
            Start
          </button>

          <button
            className="pause-btn"
            onClick={() => setRunning(false)}
          >
            Pause
          </button>

          <button
            className="reset-btn"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;