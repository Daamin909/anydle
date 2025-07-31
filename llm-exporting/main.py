from openai import OpenAI
import json
import os
from dotenv import load_dotenv
import ast
import time
import traceback

load_dotenv()
client = OpenAI(api_key=os.getenv("API_KEY"))

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
    word = str(word).strip()
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": word}
            ],
            temperature=0,
            timeout=10
        )
        string_list = response.choices[0].message.content
        return ast.literal_eval(string_list)
    except Exception as e:
        print(f"Error on word '{word}': {e}")
        traceback.print_exc()
        return ["error", "error", "error"]

def safe_check(word, retries=3):
    for _ in range(retries):
        result = check_categories(word)
        if "error" not in result:
            return result
        time.sleep(2)
    return ["error", "error", "error"]

output = []
processed_words = set()

if os.path.exists("result.json"):
    with open("result.json", "r") as f:
        existing = json.load(f)
        output = existing
        processed_words = {list(entry.keys())[0] for entry in existing}

for index, word in enumerate(words):
    if word in processed_words:
        continue
    print(f"Processing: {word} – {index + 1}/{len(words)}")
    categories = safe_check(word)
    compiled = {word: categories}
    output.append(compiled)
    with open("result.json", "w") as fs:
        json.dump(output, fs, indent=4)
    with open("progress.log", "a") as log:
        log.write(f"{word}\n")
    time.sleep(2)
