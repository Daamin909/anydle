const evaluateGuess = (guess, word) => {
  const guess_letters = guess.split("");
  const word_letters = word.split("");
  const color_code = Array(5).fill("B");
  const already_used = Array(5).fill(false);
  for (let i = 0; i < 5; i++) {
    if (guess_letters[i] === word_letters[i]) {
      color_code[i] = "G";
      already_used[i] = true;
      guess_letters[i] = null;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (guess_letters[i] !== null) {
      for (let j = 0; j < 5; j++) {
        if (!already_used[j] && guess_letters[i] === word_letters[j]) {
          color_code[i] = "Y";
          already_used[j] = true;
          break;
        }
      }
    }
  }
  return color_code.join("");
};

export default evaluateGuess;
