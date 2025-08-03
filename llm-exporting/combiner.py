import json

word_objects = None



default = []
tech = []
science = []
sports = []

with open("results.json", "r") as f:
    word_objects = json.load(f)['words']

for word_object in word_objects:
    word = list(word_object.keys())[0] 
    values = word_object[word]

    default.append(word)
    if (values[0] == "yes"):
        tech.append(word)
    if (values[1] == "yes"):
        science.append(word)
    if (values[2] == "yes"):
        sports.append(word)

with open("default.json", 'w') as fs:
    json.dump(default, fs, indent=4)
with open("technology.json", 'w') as fs:
    json.dump(tech, fs, indent=4)
with open("science.json", 'w') as fs:
    json.dump(science, fs, indent=4)
with open("sports.json", 'w') as fs:
    json.dump(sports, fs, indent=4)