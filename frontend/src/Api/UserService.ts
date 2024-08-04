import { db } from "../main.tsx";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  increment,
  FieldValue,
  runTransaction,
} from "firebase/firestore";
import { formatISO } from "date-fns";

export interface IReferral {
  username: string;
  points: number;
}

export interface IUser {
  id: number;
  username: string;
  consecutiveDays: number | FieldValue;
  lastClaimedDate?: string;
  points: number;
  referrals: IReferral[];
  hasClaimedToday: boolean;
}

class UserService {
  private userCollection = collection(db, "users");

  async addUser(user: IUser): Promise<void> {
    try {
      const userRef = doc(this.userCollection, user.id.toString());
      await setDoc(userRef, user);
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }

  async getUser(userId: string): Promise<IUser | undefined> {
    try {
      const userRef = doc(this.userCollection, userId.toString());
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const user = userDoc.data() as IUser;

        // Fetch referrals data
        if (user.referrals) {
          const referralPromises = user.referrals.map((ref) => getDoc(ref));
          const referralDocs = await Promise.all(referralPromises);

          user.referrals = referralDocs.map((doc) => doc.data()) as any; // Adjust this line to map the referral data appropriately
        }

        return user;
      } else {
        console.log("No such user!");
        return undefined;
      }
    } catch (error) {
      console.error("Error getting user: ", error);
      return undefined;
    }
  }

  async updateUser(userId: string, updatedData: Partial<IUser>): Promise<void> {
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
      const referralUserRef = doc(this.userCollection, referralId.toString());

      console.log(userRef, "userRef");
      console.log(referralUserRef, "referralUserRef");

      await updateDoc(userRef, {
        referrals: arrayUnion(referralUserRef),
      });
      console.log("Referral added successfully");
    } catch (error) {
      console.error("Error adding referral: ", error);
    }
  }

  async checkDailyReward(id: string, dispatch: any): Promise<void> {
    try {
      const today = new Date();
      const todayString = formatISO(today, { representation: "date" });
      const dailyRewardDocRef = doc(
        db,
        "users",
        id.toString(),
        "dailyRewards",
        todayString,
      );
      const dailyRewardDocSnap = await getDoc(dailyRewardDocRef);
      const isClaimed =
        dailyRewardDocSnap.exists() && dailyRewardDocSnap.data().claimed;

      console.log(isClaimed, "isClaimed in check ");

      dispatch({
        type: "UPDATE_USER_DATA",
        payload: {
          hasClaimedToday: isClaimed,
        },
      });
    } catch (error) {
      console.error("Error checking daily reward: ", error);
    }
  }

  async sendPointsToServer(userID: number, clickedPoints: number) {
    try {
      const userRef = doc(db, "users", userID.toString());
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(userRef);
        if (!docSnap.exists()) {
          throw new Error("Документ не существует!");
        }

        const newCount = docSnap.data().points + clickedPoints;
        transaction.update(userRef, { points: newCount });
      });
    } catch (e) {
      console.log(e, "error");
    }
  }

  async claimDailyReward(user: any, dispatch: any) {
    if (!user) return;

    const userID = user.id.toString();
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const rewardPoints = 100; // Логика начисления очков
    const newTotalPoints = user.points + rewardPoints;

    const dailyRewardDocRef = doc(
      db,
      "users",
      userID,
      "dailyRewards",
      todayString,
    );

    const dailyRewardDocSnap = await getDoc(dailyRewardDocRef);

    if (dailyRewardDocSnap.exists() && dailyRewardDocSnap.data().claimed) {
      console.log("You have already claimed your daily reward today.");
      return;
    }

    try {
      await setDoc(dailyRewardDocRef, {
        points: rewardPoints,
        claimed: true,
      });

      await this.updateUser(user.id.toString(), {
        points: newTotalPoints,
        lastClaimedDate: todayString,
        consecutiveDays: increment(1),
        hasClaimedToday: true,
      });

      dispatch({
        type: "UPDATE_USER_DATA",
        payload: {
          lastClaimedDate: todayString,
          consecutiveDays: user.consecutiveDays + 1,
          hasClaimedToday: true,
        },
      });

      dispatch({
        type: "SET_POINTS",
        payload: newTotalPoints,
      });

      console.log("Reward claimed successfully");
    } catch (err) {
      console.error("Failed to claim reward:", err);
    }
  }
}

export default UserService;
