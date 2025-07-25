import wordsJSON from "../assets/words.json";

const isValidWord = (word) => {
  const words = wordsJSON.words;
  return words.includes(word.toLowerCase());
};

export default isValidWord;
