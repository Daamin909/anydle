const calculateScore = (currentWord, category) => {
  const adjectives = [
    "Genius",
    "Magnificent",
    "Impressive",
    "Splendid",
    "Great",
    "Phew",
  ];

  const index = currentWord - 1;
  let score = 0;

  if (category === "default") {
    if (index === 0 || index === 4) {
      score = 2;
    } else if (index === 1 || index === 3) {
      score = 3;
    } else if (index === 2) {
      score = 5;
    } else if (index === 5) {
      score = 1;
    }
  } else {
    if (index === 0 || index === 4) {
      score = 2;
    } else if (index === 1 || index === 3) {
      score = 3;
    } else if (index === 2) {
      score = 4;
    } else if (index === 5) {
      score = 1;
    }
  }

  return {
    score,
    adjective: adjectives[index],
  };
};

export default calculateScore;
