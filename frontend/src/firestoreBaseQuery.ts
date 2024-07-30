import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "./main.tsx"; // Ensure your firebaseConfig file is correctly set up

const firestoreBaseQuery = async ({ url, method, data }: any) => {
  try {
    if (method === "GET") {
      if (url.includes("/")) {
        const docRef = doc(db, url);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { data: docSnap.data() };
        } else {
          throw new Error("Document does not exist");
        }
      } else {
        const collectionRef = collection(db, url);
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        const dataArray: any[] = [];
        querySnapshot.forEach((doc) => {
          dataArray.push({ id: doc.id, ...doc.data() });
        });
        return { data: dataArray };
      }
    } else if (method === "POST") {
      const collectionRef = collection(db, url);
      const docRef = await addDoc(collectionRef, data);
      return { data: { id: docRef.id, ...data } };
    } else if (method === "PUT") {
      const docRef = doc(db, url);
      await setDoc(docRef, data, { merge: true });
      return { data };
    }
    // Add other HTTP methods as needed (e.g., DELETE)
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export default firestoreBaseQuery;
