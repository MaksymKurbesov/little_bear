import { db } from "../main.tsx";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { addDays, formatISO, isSameDay } from "date-fns";
import { DAILY_REWARDS_BY_DAY } from "../utils/consts.ts";

interface User {
  id: string;
  status: string;
  username: string;
  consecutiveDays: number;
  lastClaimedDate?: string;
  points: number;
}

class UserService {
  private userCollection = collection(db, "users");

  async addUser(user: User): Promise<void> {
    try {
      const userRef = doc(this.userCollection, user.id);
      await setDoc(userRef, user);
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }

  async getUser(userId: string): Promise<User | undefined> {
    try {
      const userRef = doc(this.userCollection, userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data() as User;
      } else {
        console.log("No such user!");
        return undefined;
      }
    } catch (error) {
      console.error("Error getting user: ", error);
      return undefined;
    }
  }

  async updateUser(userId: string, updatedData: Partial<User>): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userId);
      await updateDoc(userRef, updatedData);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userId);
      await deleteDoc(userRef);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  }

  async addReferral(userId: string, referralId: string): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userId);
      await updateDoc(userRef, { referralId });
      console.log("Referral added successfully");
    } catch (error) {
      console.error("Error adding referral: ", error);
    }
  }

  async checkDailyReward(
    username: string,
    setUserData: (callback: (prevState: any) => any) => void,
  ): Promise<void> {
    try {
      const today = new Date();
      const todayString = formatISO(today, { representation: "date" });
      const dailyRewardDocRef = doc(
        db,
        "users",
        username,
        "dailyRewards",
        todayString,
      );
      const dailyRewardDocSnap = await getDoc(dailyRewardDocRef);

      if (dailyRewardDocSnap.exists() && dailyRewardDocSnap.data().claimed) {
        setUserData((prevState) => ({
          ...prevState,
          hasClaimedToday: true,
        }));
      } else {
        setUserData((prevState) => ({
          ...prevState,
          hasClaimedToday: false,
        }));
      }
    } catch (error) {
      console.error("Error checking daily reward: ", error);
    }
  }

  async claimDailyReward(
    userData: User,
    setUserData: (callback: (prevState: any) => any) => void,
  ): Promise<void> {
    if (!userData) return;

    const today = new Date();
    const todayString = formatISO(today, { representation: "date" });

    const userDocRef = doc(db, "users", userData.username);
    const dailyRewardDocRef = doc(
      db,
      "users",
      userData.username,
      "dailyRewards",
      todayString,
    );

    const dailyRewardDocSnap = await getDoc(dailyRewardDocRef);

    if (dailyRewardDocSnap.exists() && dailyRewardDocSnap.data().claimed) {
      console.log("You have already claimed your daily reward today.");
      return;
    }

    let newConsecutiveDays = userData.consecutiveDays;

    if (userData.lastClaimedDate) {
      const lastClaimedDate = new Date(userData.lastClaimedDate);

      if (isSameDay(addDays(lastClaimedDate, 1), today)) {
        newConsecutiveDays += 1;
      } else if (!isSameDay(lastClaimedDate, today)) {
        newConsecutiveDays = 1;
      }
    } else {
      newConsecutiveDays = 1;
    }

    const rewardPoints =
      DAILY_REWARDS_BY_DAY[newConsecutiveDays % DAILY_REWARDS_BY_DAY.length]; // Define your logic for points allocation here
    const newTotalPoints = userData.points + rewardPoints;

    try {
      await setDoc(dailyRewardDocRef, {
        points: rewardPoints,
        claimed: true,
      });

      await updateDoc(userDocRef, {
        points: newTotalPoints,
        lastClaimedDate: todayString,
        consecutiveDays: newConsecutiveDays,
      });

      setUserData((prevUser: any) => ({
        ...prevUser,
        points: newTotalPoints,
        lastClaimedDate: todayString,
        consecutiveDays: newConsecutiveDays,
        hasClaimedToday: true,
      }));

      console.log("Daily reward claimed successfully.");
    } catch (err) {
      console.error("Failed to claim daily reward:", err);
    }
  }
}

export default UserService;
