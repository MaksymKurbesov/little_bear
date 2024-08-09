import { useState, useEffect } from "react";

type CountdownReturn = [string, string, string, string];

const useCountdown = (targetDate: string | number | Date): CountdownReturn => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState<number>(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const formatTime = (time: number): string => {
    return time < 10 ? `0${time}` : time.toString();
  };

  const getReturnValues = (countDown: number): CountdownReturn => {
    const days: number = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes: number = Math.floor(
      (countDown % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds: number = Math.floor((countDown % (1000 * 60)) / 1000);

    return [
      formatTime(days),
      formatTime(hours),
      formatTime(minutes),
      formatTime(seconds),
    ];
  };

  return getReturnValues(countDown);
};

export default useCountdown;
