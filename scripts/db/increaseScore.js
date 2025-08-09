import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const increaseScore = async (points) => {
  try {
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
