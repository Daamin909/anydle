import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const increaseScore = async (points) => {
  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const user = auth.currentUser;
  if (!user) return null;
  const uid = user.uid;
  const scoreRef = doc(db, "leaderboard", uid);
  const scoreSnap = await getDoc(scoreRef);

  if (scoreSnap.exists()) {
    const current = scoreSnap.data().score || 0;
    await updateDoc(scoreRef, {
      score: current + points,
      lastUpdated: new Date(),
    });
  } else {
    await setDoc(scoreRef, {
      email: user.email,
      username: user.displayName,
      photoURL: user.photoURL,
      score: points,
      lastUpdated: new Date(),
    });
  }
};

export default increaseScore;
