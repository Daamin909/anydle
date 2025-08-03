import default_list from "../assets/json/default.json";
import tech from "../assets/json/tech.json";
import science from "../assets/json/science.json";
import sports from "../assets/json/sports.json";

const getRandomWord = (category) => {
  var words;
  switch (category) {
    case "default":
      words = default_list;
      break;
    case "tech":
      words = tech;
      break;
    case "science":
      words = science;
      break;
    case "sports":
      words = sports;
      break;
  }
  return words[Math.floor(Math.random() * words.length)];
};

export default getRandomWord;
