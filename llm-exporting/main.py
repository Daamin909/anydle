from openai import OpenAI
import json
import os
from dotenv import load_dotenv
import ast
import time

load_dotenv()
client = OpenAI(api_key=os.getenv("API_KEY"))

# Load words
with open("words.json", "r") as f:
    imported_words = json.load(f)
    words = imported_words['words']

def check_categories(word):
    prompt = """
        You are an expert keyword classifier.
        When the user gives a single English word, determine if it is related to any of the following categories:
        - Technology
        - Science
        - Sports

        Be fairly strict — consider common usage, associations, and broader context (e.g., "laser" → science and tech, "pitch" → sports).
        Only answer "yes" if the word is commonly and clearly associated with the category in everyday language or typical usage. Avoid edge cases or weak associations.
        Your response must be a valid Python list of 3 strings, in this order:
        ["yes" or "no", "yes" or "no", "yes" or "no"]
        (technology, science, sports — in that exact order).
        Do not include any explanation. Respond only with the Python list.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": word}
            ],
            temperature=0,
        )
        string_list = response.choices[0].message.content
        return ast.literal_eval(string_list)
    except Exception as e:
        print(f"Error processing word '{word}': {e}")
        return ["error", "error", "error"]

output = []

for word in words:
    print(f"Processing: {word}")
    categories = check_categories(word)
    compiled = {word: categories}
    output.append(compiled)
    with open("result.json", "w") as fs:
        json.dump(output, fs, indent=4)

    time.sleep(0.5)
