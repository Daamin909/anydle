import { getApp } from "firebase/app";
import {
  collection,
  query,
  orderBy,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const getLeaderboard = async () => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
    const snap = await getDocs(q);
    const leaderboard = [];

    snap.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() });
    });

    return leaderboard;
  } catch (error) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Error",
      textBody: error.message,
    });
  }
};

export default getLeaderboard;
