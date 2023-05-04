import json
from json_to_python import JsonToPython

with open("Helpers/factorial.json") as f:
    json_structure = json.load(f)

transpiler = JsonToPython(json_structure)
python_code = transpiler.transpile()

# with open("output.py", "w") as f:
#     try:
#         f.write(python_code)
#     except Exception as e:
#         print(f"Error writing to file: {e}")

print(python_code)
