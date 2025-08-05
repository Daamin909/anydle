import { getApp } from "firebase/app";
import {
  collection,
  query,
  orderBy,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const getLeaderboard = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
  const snap = await getDocs(q);
  const leaderboard = [];

  snap.forEach((doc) => {
    leaderboard.push({ id: doc.id, ...doc.data() });
  });
  return leaderboard;
};

export default getLeaderboard;
