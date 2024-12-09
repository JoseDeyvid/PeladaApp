import React, { useState, useRef, useEffect } from "react";
import ButtonDefault from "../ButtonDefault";
import "./styles.css";
const Timer = ({ gameTime, setModalIsOpen, timer, setTimer, Ref }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(Ref.current);
      onClickFinishGame();
    }
  };

  const clearTimer = (e) => {
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = ({ hours = 0, minutes = 0, seconds = 0 }) => {
    let deadline = new Date();
    deadline.setHours(deadline.getHours() + hours);
    deadline.setMinutes(deadline.getMinutes() + minutes);
    deadline.setSeconds(deadline.getSeconds() + seconds);
    return deadline;
  };

  const onClickStart = () => {
    clearTimer(getDeadTime({ seconds: gameTime }));
    setIsPaused(false);
    setTimer(`00:${gameTime > 9 ? gameTime : "0" + gameTime}:00`);
  };

  const onClickPause = () => {
    if (!isPaused) {
      clearInterval(Ref.current);
      setIsPaused(true);
    } else {
      setIsPaused(false);
      const newTimer = timer.split(":");
      clearTimer(
        getDeadTime({
          hours: Number(newTimer[0]),
          minutes: Number(newTimer[1]),
          seconds: Number(newTimer[2]),
        })
      );
    }
  };

  const onClickFinishGame = () => {
    setModalIsOpen(true);
    clearInterval(Ref.current);
  };

  return (
    <div className="timer-container">
      <h2 className="timer">{timer}</h2>
      <div className="controls-timer">
        <ButtonDefault
          handleClickBtn={onClickStart}
          btnTxt={`${Ref.current ? "Recomeçar partida" : "Iniciar partida"}`}
        />
        {Ref.current && (
          <ButtonDefault
            handleClickBtn={onClickPause}
            btnTxt={`${isPaused ? "Despausar partida" : "Pausar partida"}`}
          />
        )}
        {/* {Ref.current && <ButtonDefault handleClickBtn={onClickFinishGame} btnTxt={"Encerrar partida!"} />} */}
        {Ref.current && (
          <button
            className="button-default finish-game"
            onClick={() => onClickFinishGame()}
          >
            Encerrar partida!
          </button>
        )}
        {isOpen && <ModalWhoLost setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
};

export default Timer;
