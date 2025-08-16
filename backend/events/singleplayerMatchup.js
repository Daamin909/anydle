const { getApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const singleplayerMatchup = async (msg) => {
  const app = getApp();
  const db = getFirestore(app);
  const uid = msg.uid;
  const data = {
    createdAt: new Date(),
    sentAt: msg.timestamp,
    email: msg.email,
    username: msg.username,
    uid: msg.uid,
  };
  const userData = db.collection("looking_for_matchup").doc(uid);
  await userData.set(data);
  console.log(`Added looking_for_matchup to ${msg.email}'s account`);

  const pair = pairUsers();
};

const attachMatchupListener = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const unsubscribe = db
    .collection("looking_for_matchup")
    .onSnapshot((snap) => {
      console.log(snap);
    });
};

module.exports = { singleplayerMatchup, attachMatchupListener };
