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
    socketID: msg.socketID,
  };
  const userData = db.collection("looking_for_matchup").doc(uid);
  await userData.set(data);
  console.log(`Added looking_for_matchup to ${msg.email}'s account`);
};

const attachMatchupListener = async (io) => {
  const app = getApp();
  const db = getFirestore(app);
  const unsubscribe = db
    .collection("looking_for_matchup")
    .onSnapshot((snap) => {
      const docs_list = snap.docs.map((doc) => ({
        ...doc.data(),
      }));

      const pairs = makePairs(docs_list);
      if (!pairs) {
        console.log("less than 2 people in queue");
        return;
      } else {
        console.log(`there are ${pairs.pairs.length} pairs.`);
        console.log(`there are ${pairs.leftovers.length} leftovers.`);
      }
      sendInvitations(pairs.pairs, io);
    });
};
const sendInvitations = (pairs, io) => {
  pairs.forEach((pair) => {
    if (!io) return null;
    io.to(pair[0].socketID).emit("matchInvitation", {
      opponent: { uid: pair[1].uid, email: pair[1].email },
    });
    io.to(pair[1].socketID).emit("matchInvitation", {
      opponent: { uid: pair[0].uid, email: pair[0].email },
    });
  });
};
const makePairs = (queue) => {
  let pairs = [];
  let leftovers = [];
  let copy = [...queue];
  if (copy.length < 2) {
    return null;
  }
  if (copy.length % 2 !== 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    leftovers.push(copy.splice(randomIndex, 1)[0]);
  }
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  for (let i = 0; i < copy.length; i += 2) {
    pairs.push([copy[i], copy[i + 1]]);
  }
  return { pairs, leftovers };
};
module.exports = { singleplayerMatchup, attachMatchupListener };
