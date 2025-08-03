import default_list from "../assets/json/default.json";

const isValidWord = (word) => {
  const words = default_list;
  return words.includes(word.toLowerCase());
};

export default isValidWord;
