import { levelThresholds } from "./consts.ts";
import { IUser } from "../Api/UserApi.ts";

export const calculateTimeLeft = () => {
  const now = new Date();

  // Получаем текущее время
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  // Создаем объект завтрашнего дня на полночь локального времени
  const tomorrow = new Date(
    currentYear,
    currentMonth,
    currentDate + 1,
    0,
    0,
    0,
    0,
  );

  const diff = tomorrow.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

export const debounce = (func, delay) => {
  let timeoutId;

  return function executedFunction(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getLevelByPoints = (points: number) => {
  const newLevel = levelThresholds.findIndex((threshold) => points < threshold);
  return newLevel >= 0 ? newLevel : levelThresholds.length - 1;
};

export const generateUserData = (username: string, id: number): IUser => {
  return {
    id,
    username: username,
    consecutiveDays: 0,
    lastClaimedDate: "",
    points: 0,
    referrals: [],
    hasClaimedToday: false,
  };
};

export const triggerVibration = (tg) => {
  const vibrationEnabled = localStorage.getItem("vibrationEnabled") === "true";
  if (vibrationEnabled) {
    tg.HapticFeedback.impactOccurred("rigid");
  }
};

export const calculateProgressBar = (points: number, level: number) => {
  if (level - 1 >= levelThresholds.length - 1) {
    return 100;
  }

  const prevThreshold = levelThresholds[level - 1];
  const nextThreshold = levelThresholds[level];
  return ((points - prevThreshold) / (nextThreshold - prevThreshold)) * 100;
};

export function getLittleBearId(queryString: string) {
  // Parse the query string to get the value of tgWebAppStartParam
  const params = new URLSearchParams(queryString);
  const tgWebAppStartParam = params.get("tgWebAppStartParam");

  // Check if tgWebAppStartParam exists
  if (!tgWebAppStartParam) {
    return null;
  }

  // Decode the value of tgWebAppStartParam
  const decodedParam = decodeURIComponent(tgWebAppStartParam);

  // Parse the decoded parameter to get the value of little_bear_id
  const startParams = new URLSearchParams(decodedParam);
  const littleBearId = startParams.get("little_bear_id");

  return littleBearId;
}

export const simulateLoadingProgress = (callback) => {
  let progress = 0;
  const startTime = Date.now();

  const interval = setInterval(
    () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 3000 - elapsedTime;

      // Увеличиваем прогресс случайным образом от 5 до 15 процентов
      progress += Math.floor(Math.random() * 10) + 5;

      // Ограничиваем прогресс значением 100
      if (progress > 100) {
        progress = 100;
      }

      // Вызываем callback с текущим значением прогресса
      callback(progress);

      // Проверяем, если прошло больше 3 секунд
      if (remainingTime <= 0) {
        clearInterval(interval);
        callback(100); // Устанавливаем прогресс на 100% по завершении
      }
    },
    Math.random() * 300 + 200,
  ); // Интервал от 200 до 500 мс
};
