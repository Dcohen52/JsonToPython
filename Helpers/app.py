from flask import Flask, request, jsonify, render_template
from python_to_json import PythonToJson
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/transpile', methods=['POST'])
def transpile():
    python_code = request.form.get('code', '')
    if not python_code:
        return jsonify({"error": "No code provided"}), 400

    try:
        transpiler = PythonToJson(python_code)
        json_structure = transpiler.transpile()
        return jsonify(json.loads(json_structure))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
