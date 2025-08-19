const { getApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const default_words = require("../assets/json/default.json");

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
const sendInvitations = async (pairs, io) => {
  for (const pair of pairs) {
    const [player1, player2] = pair;
    const receivedOrNot = {
      [player1.uid]: null,
      [player2.uid]: null,
    };

    const promises = [player1, player2].map((player, id) => {
      const opponent = id === 0 ? player2 : player1;
      const socket = io.sockets.sockets.get(player.socketID);

      if (!socket) {
        console.log(`Socket not found for ${player.email}`);
        receivedOrNot[player.uid] = "no";
        return Promise.resolve();
      }
      return socket
        .timeout(1000)
        .emitWithAck("matchFound", {
          opponentEmail: opponent.email,
          opponentUID: opponent.uid,
        })
        .then((response) => {
          console.log(`${player.email} responded`);
          receivedOrNot[player.uid] = response.accepted ? "yes" : "no";
        })
        .catch((err) => {
          console.error(err.message);
          console.log(`${player.email} did not respond`);
          receivedOrNot[player.uid] = "no";
        });
    });

    await Promise.all(promises);

    if (
      receivedOrNot[player1.uid] === "yes" &&
      receivedOrNot[player2.uid] === "yes"
    ) {
      console.log("both received it");
      await invitationAccepted(player1, player2, io);
    } else {
      console.log("some one did not receive it");
      await invitationTimeOut(
        player1,
        player2,
        receivedOrNot[player1.uid],
        receivedOrNot[player2.uid]
      );
    }
  }
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
const invitationAccepted = async (player1, player2, io) => {
  const app = getApp();
  const db = getFirestore(app);

  const word = pickRandomWords();

  const matchID = db.collection("matches").doc().id;
  await db
    .collection("matches")
    .doc(matchID)
    .set({
      id: matchID,
      players: [player1.uid, player2.uid],
      sockets: [player1.socketID, player2.socketID],
      words: word,
      guesses: {
        [player1.uid]: [],
        [player2.uid]: [],
      },
      status: "active",
      createdAt: new Date(),
    });

  await db.collection("looking_for_matchup").doc(player1.uid).delete();
  await db.collection("looking_for_matchup").doc(player2.uid).delete();

  io.to(player1.socketID).socketsJoin(matchID);
  io.to(player2.socketID).socketsJoin(matchID);
  io.to(matchID).emit("matchStarted", {
    matchID,
    opponent1: { uid: player1.uid, email: player1.email },
    opponent2: { uid: player2.uid, email: player2.email },
    wordLength: word.length,
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

const pickRandomWords = () => {
  let wordlist = [...default_words];
  let words = [];
  for (let x = 0; x <= 4; x++) {
    const word = wordlist[Math.floor(Math.random() * wordlist.length)];
    words.push(word);
    wordlist.splice(wordlist.indexOf(word), 1);
  }
  return words;
};

module.exports = { singleplayerMatchup, attachMatchupListener };
