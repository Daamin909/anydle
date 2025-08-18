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
    const [player1, player2] = pair;
    const receivedOrNot = {
      [player1.uid]: null,
      [player2.uid]: null,
    };

    [player1, player2].forEach((player, idx) => {
      const opponent = idx === 0 ? player2 : player1;

      io.to(player.socketID)
        .timeout(10000) // wait 10s max
        .emit(
          "matchFound",
          {
            opponentEmail: opponent.email,
            opponentUID: opponent.uid,
          },
          (err, response) => {
            if (err) {
              console.log("did not receive");
              receivedOrNot[player.uid] = "no";
            } else {
              console.log("received");
              receivedOrNot[player.uid] = response.accepted ? "yes" : "no";
            }
            if (
              receivedOrNot[player1.uid] !== null &&
              receivedOrNot[player2.uid] !== null
            ) {
              if (
                receivedOrNot[player1.uid] === "yes" &&
                receivedOrNot[player2.uid] === "yes"
              ) {
                console.log("both received it ");
                invitationAccepted(player1, player2);
              } else {
                console.log("either one did not receive it");
                invitationTimeOut(
                  player1,
                  player2,
                  receivedOrNot[player1.uid],
                  receivedOrNot[player2.uid]
                );
              }
            }
          }
        );
    });
  });
};

const invitationTimeOut = async (player1, player2, p1, p2) => {
  const app = getApp();
  const db = getFirestore(app);
  if (p1 !== "yes") {
    await db.collection("looking_for_matchup").doc(player1.uid).delete();
  }
  if (p2 !== "yes") {
    await db.collection("looking_for_matchup").doc(player2.uid).delete();
  }
};
const invitationAccepted = async (player1, player2) => {
  const app = getApp();
  const db = getFirestore(app);
  await db.collection("looking_for_matchup").doc(player1.uid).delete();
  await db.collection("looking_for_matchup").doc(player2.uid).delete();
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
