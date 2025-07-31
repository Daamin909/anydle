import json

with open("words.json", "r") as f:
    words = json.load(f)["words"]

chunk_size = len(words) // 3
parts = [words[:chunk_size], words[chunk_size:chunk_size*2], words[chunk_size*2:]]

for i, part in enumerate(parts):
    with open(f"words_part{i+1}.json", "w") as f:
        json.dump({"words": part}, f, indent=2)
