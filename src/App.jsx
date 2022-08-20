import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timerControl, setTimerControl] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const beepAudio = useRef();

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  const sessionIncrement = () => {
    if (!timerControl && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const sessionDecrement = () => {
    if (!timerControl && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const breakIncrement = () => {
    if (!timerControl && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const breakDecrement = () => {
    if (!timerControl && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  useEffect(() => {
    const handleSwitch = () => {
      if (!timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else if (timerLabel === "Break") {
        setTimeLeft("Session");
        setTimeLeft(sessionLength * 60);
      }
    };

    let countdown = null;
    if (timerControl && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timerControl && timeLeft === 0) {
      countdown = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      beepAudio.current.play();
      handleSwitch();
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [
    timerControl,
    timeLeft,
    timerLabel,
    breakLength,
    sessionLength,
    beepAudio,
  ]);

  const handleStart = () => {
    setTimerControl(true);
  };

  const handleStop = () => {
    setTimerControl(false);
  };

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    setTimerControl(false);
    beepAudio.current.pause();
    beepAudio.current.currentTime = 0;
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">25 + 5 CLOCK</div>
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <button
            onClick={breakDecrement}
            value="-"
            className="btn-level"
            id="break-decrement"
          >
            <i class="fa-solid fa-arrow-down"></i>
          </button>
          <div className="btn-level" id="break-length">
            {breakLength}
          </div>
          <button
            onClick={breakIncrement}
            value="+"
            className="btn-level"
            id="break-increment"
          >
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <button
            onClick={sessionDecrement}
            value="-"
            className="btn-level"
            id="session-decrement"
          >
            <i class="fa-solid fa-arrow-down"></i>
          </button>
          <div className="btn-level" id="session-length">
            {sessionLength}
          </div>
          <button
            onClick={sessionIncrement}
            value="+"
            className="btn-level"
            id="session-increment"
          >
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>

        <div className="timer">
          <div className="timer-wrapper">
            <div id="timer-label">Session</div>
            <div id="time-left">
              {" "}
              {minutes < 10 ? ("0" + minutes).slice(-2) : minutes}:
              {seconds < 10 ? ("0" + seconds).slice(-2) : seconds}
            </div>
          </div>
        </div>

        <div className="timer-control">
          <button
            onClick={timerControl ? handleStop : handleStart}
            id="start_stop"
          >
            <i class="fa-solid fa-play"></i>
            <i class="fa-solid fa-pause"></i>
          </button>
          <button onClick={handleReset} id="reset">
            <i class="fa-solid fa-arrow-rotate-right"></i>
          </button>
        </div>
        <audio
          ref={beepAudio}
          id="beep"
          type="audio"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
}

export default App;
