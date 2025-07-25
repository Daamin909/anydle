import words from "../assets/words.json";

const getRandomWord = () => {
  const word = words.words;
  return word[Math.floor(Math.random() * word.length)];
};

export default getRandomWord;
