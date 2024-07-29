import { LEVELS_BY_POINTS } from "./consts.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../main.tsx";

export const calculateTimeLeft = (targetHour: number) => {
  const now = new Date();
  const target = new Date(now);
  target.setUTCHours(targetHour, 0, 0, 0);

  if (now.getUTCHours() >= targetHour) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

export const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
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

export const getRank = (points: number): string => {
  let rank: string = "Bronze"; // Default rank

  const thresholds: number[] = Object.keys(LEVELS_BY_POINTS)
    .map(Number)
    .sort((a, b) => b - a);
  for (const threshold of thresholds) {
    if (points >= threshold) {
      rank = LEVELS_BY_POINTS[threshold];
      break;
    }
  }

  return rank;
};

export const registerUser = async (nickname: string) => {
  const userRef = doc(db, "users", nickname);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const registeredUser = generateUserData(nickname);

    await setDoc(userRef, registeredUser);
    setUserData(registeredUser);
  }
};

export const generateUserData = (username: string, id: string) => {
  return {
    id,
    username: username,
    points: 0,
    status: "Bronze",
    consecutiveDays: 0,
    lastClaimedDate: "",
  };
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
