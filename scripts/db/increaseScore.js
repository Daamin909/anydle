import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const increaseScore = async (points) => {
  try {
    const app = getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

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
        photoURL: user.photoURL || null,
        score: points,
        lastUpdated: new Date(),
      });
    }

    return true;
  } catch (error) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Error",
      textBody: error.message,
    });
  }
};

export default increaseScore;
