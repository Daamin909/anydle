import Groq from "groq-sdk";
import { GROQ_API_KEY } from "@env";

const cleanWords = (wordList) => {
  return wordList
    .map((w) => w.trim().toLowerCase())
    .filter((w) => /^[a-z]{5}$/.test(w));
};

const getCategory = async (keyword) => {
  const groq = new Groq({ apiKey: GROQ_API_KEY });
  console.log(keyword);
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: `
                    You are a helpful assistant that generates 5-letter English words based on a given keyword. 
                    When the user enters <some_english_word>, treat <some_english_word> as a category or semantic keyword (e.g., "tech", "nature", "medical", etc).
                    Think of as many relevant **5-letter words** as possible that match the meaning, context, or theme of the keyword.
                    Return your result as a strict JSON object in the following format:

                    {
                      "words": ["word1", "word2", "word3", "..."]
                    }

                    * Only include **valid** 5-letter English words.
                    * Do **not** include any word longer or shorter than 5 letters.
                    * Maximize the number of relevant 5-letter words, ideally up to 100 if possible.
                    * Output strictly in JSON and nothing else.
                  `,
        },
        {
          role: "user",
          content: `<${keyword}>`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      top_p: 1.0,
      max_tokens: 1024,
      stream: false,
    })
    .then((chatCompletion) => {
      try {
        const parsed = JSON.parse(chatCompletion.choices[0]?.message?.content);
        const finalWordList = cleanWords(parsed.words);
        console.log(finalWordList);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    });
};

export default getCategory;
