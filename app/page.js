"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isType, setIsType] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(sessionLength * 60);
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    setTotalSeconds(breakLength * 60);
  }, [breakLength]);

  useEffect(() => {
    setTotalSeconds(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        if (!pauseRef.current) {
          setTotalSeconds((prev) => (prev <= -1 ? 0 : prev - 1));
        }
      }, 1000)
    );
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };
  const resumeTimer = () => {
    setIsPaused(false);
  };

  const clearTimer = () => {
    clearInterval(timer);
    setSessionLength(25);
    setTotalSeconds(25 * 60);
    setBreakLength(5);
    setIsPaused(false);
    setTimer(null);
    setIsType(true);
    alarmStop();
  };

  const startStop = () => {
    if (!timer && !isPaused) {
      startTimer();
      return;
    }
    if (timer && isPaused) {
      resumeTimer();
      return;
    }
    pauseTimer();
  };
  const adjustTimer = (totalSeconds) => {
    if (totalSeconds >= 0) {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return `${padZero(minutes)}:${padZero(seconds)}`;
    } else {
      return `${padZero(0)}:${padZero(0)}`;
    }
  };

  const padZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  const alarmPlay = () => {
    document.getElementById("beep").play();
  };
  const alarmStop = () => {
    let audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const incrementSessionLength = () => {
    setSessionLength((prev) => (prev >= 60 ? 60 : prev + 1));
  };
  const decrementSessionLength = () => {
    setSessionLength((prev) => (prev <= 1 ? 1 : prev - 1));
  };
  const incrementBreakLength = () => {
    setBreakLength((prev) => (prev >= 60 ? 60 : prev + 1));
  };
  const decrementBreakLength = () => {
    setBreakLength((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  useEffect(() => {
    if (totalSeconds === -1) {
      alarmPlay();
      clearInterval(timer);

      if (isType) {
        setTotalSeconds(breakLength * 60);
        setIsType(false);
      } else {
        setTotalSeconds(sessionLength * 60);
        setIsType(true);
      }
      startTimer();
    }
  }, [totalSeconds]);

  return (
    <div className=" relative w-[100dvw] h-[100dvh] flex flex-col  justify-center  items-center ">
      <Image
        src="/plaines.jpg"
        fill
        sizes="100dvw"
        alt="lotus-background"
        className=" absolute inset-0 -z-10 object-cover object-center brightness-50"
      />
      <div className=" w-1/2 h-fit">
        <h1 className="mb-4  mx-auto w-fit text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-gray-200">
          25 + 5 Clock
        </h1>
      </div>
      <div className="flex flex-row gap-2">
        <div className="  h-fit">
          <label
            id="break-label"
            className="mb-8 text-lg  w-fit font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48 "
          >
            Break Length{" "}
          </label>
          <div className="flex flex-row items-center justify-center">
            <button
              id="break-increment"
              className="hover:scale-110"
              onClick={incrementBreakLength}
              disabled={breakLength >= 60}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="#fff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                />
              </svg>
            </button>
            <div
              id="break-length"
              className="mb-8 text-lg  w-fit font-normal text-gray-200 lg:text-xl px-5"
            >
              {breakLength}
            </div>
            <button
              id="break-decrement"
              className="hover:scale-110"
              onClick={decrementBreakLength}
              disabled={breakLength <= 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="#fff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="  h-fit">
          <label
            id="session-label"
            className="mb-8 text-lg  w-fit font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48"
          >
            Session Length{" "}
          </label>
          <div className="flex flex-row items-center justify-center">
            <button
              id="session-increment"
              className="hover:scale-110"
              onClick={incrementSessionLength}
              disabled={sessionLength >= 60}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="#fff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                />
              </svg>
            </button>
            <div
              id="session-length"
              className="mb-8 text-lg  w-fit font-normal text-gray-200 lg:text-xl px-5"
            >
              {sessionLength}
            </div>
            <button
              id="session-decrement"
              className="hover:scale-110"
              onClick={decrementSessionLength}
              disabled={sessionLength <= 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="#fff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`min-w-[400px] min-h-[400px] flex justify-center flex-col  bg-transparent  border-[8px] ${
          totalSeconds < 60 ? "border-red-500" : "border-gray-200"
        } rounded-full shadow dark:bg-gray-800 dark:border-gray-700`}
      >
        <h1
          className={`mb-4  mx-auto w-fit text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl ${
            totalSeconds < 60 ? `text-red-500` : `text-gray-200`
          }`}
          id="timer-label"
        >
          {isType ? "Session" : "Break"}
        </h1>
        <div
          className={`mb-4  mx-auto w-fit text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl ${
            totalSeconds < 60 ? `text-red-500` : `text-gray-200`
          }`}
          id="time-left"
        >
          {adjustTimer(totalSeconds)}
        </div>
      </div>
      <div className=" w-1/2 flex flex-row justify-center h-fit">
        <button id="start_stop" onClick={startStop}>
          <div>
            {!timer && !isPaused && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 30"
                strokeWidth={2}
                stroke="#fff"
                className="w-14 h-14 hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            )}
            {timer && (
              <>
                {isPaused ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 30 30"
                    strokeWidth={2}
                    stroke="#fff"
                    className="w-14 h-14 hover:scale-110"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 30 30"
                    strokeWidth={2}
                    stroke="#fff"
                    className="w-14 h-14 hover:scale-110"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                  </svg>
                )}
              </>
            )}
          </div>
        </button>

        <button id="reset" onClick={clearTimer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 30"
            strokeWidth={2}
            stroke="#fff"
            className="w-14 h-14 hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <audio id="beep" src="/relaxing-145038.mp3" className="clip" />
    </div>
  );
}
