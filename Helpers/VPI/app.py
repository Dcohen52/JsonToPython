from flask import Flask, request, jsonify, render_template
from python_to_json import PythonToJson
import json

app = Flask(__name__)

# Initialize an empty list to store the workspace state
workspace_state = []

@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to save the workspace state
@app.route('/save_workspace', methods=['POST'])
def save_workspace():
    global workspace_state
    workspace_data = request.json
    workspace_state = workspace_data['blocks']
    # Process and save the workspace data as needed
    # ...

    # Return a response
    return jsonify({'message': 'Workspace saved successfully'})

# API endpoint to retrieve the workspace state
@app.route('/get_workspace', methods=['GET'])
def get_workspace():
    global workspace_state
    # Retrieve the workspace state
    workspace_data = {'blocks': workspace_state}
    # Process the workspace data as needed
    # ...

    # Return the workspace state as a response
    return jsonify(workspace_data)

# API endpoint to transpile Python code to JSON
@app.route('/transpile', methods=['POST'])
def transpile():
    python_code = request.json['python_code']
    transpiler = PythonToJson(python_code)
    json_structure = transpiler.transpile()

    # Convert the Python code to JSON structure
    json_data = json.loads(json_structure)

    # Return the Python code and JSON structure as a response
    return jsonify({
        'pythonCode': python_code,
        'jsonCode': json_data
    })

if __name__ == '__main__':
    app.run()
