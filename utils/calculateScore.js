const calculateScore = (currentWord, category) => {
  if (category == "default") {
    if (currentWord - 1 === 0 || currentWord - 1 === 4) {
      return 2;
    } else if (currentWord - 1 === 1 || currentWord - 1 === 3) {
      return 3;
    } else if (currentWord - 1 === 2) {
      return 5;
    } else if (currentWord - 1 === 5) {
      return 1;
    }
  } else {
    if (currentWord - 1 === 0 || currentWord - 1 === 4) {
      return 2;
    } else if (currentWord - 1 === 1 || currentWord - 1 === 3) {
      return 3;
    } else if (currentWord - 1 === 2) {
      return 4;
    } else if (currentWord - 1 === 5) {
      return 1;
    }
  }
};
export default calculateScore;
