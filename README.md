# PJHarpy

PJHarpy is a powerful package designed to transpile JSON structure-code into Python code and vice versa. It features two classes: JsonToPython and PythonToJSON. The JsonToPython class enables developers to efficiently compose Python code using JSON files, supporting various constructs like variables, functions, if-else statements, loops, return statements, and more. On the other hand, the PythonToJSON class facilitates the conversion of Python code into a JSON representation of its abstract syntax tree (AST). PJHarpy's goal is to provide a fresh, innovative approach to web development that closely mirrors JSON, catering to the evolving demands of the industry. With its easy installation and versatile usage, PJHarpy is an invaluable tool for developers looking to streamline their coding process and enhance their workflow.

## JsonToPython class
`JsonToPython` is a Python class designed to facilitate the seamless conversion of JSON structure-code into Python code. This library accommodates a diverse range of Python constructs, including variables, functions, if-else statements, while and for loops, return statements, print statements, and input statements, among others. By leveraging the versatility of `JsonToPython`, developers can harness their creativity to efficiently compose code using JSON files.

The driving force behind this project was to create a programming language that closely mirrors JSON, offering a fresh and innovative approach to web development, which caters to the evolving demands of the industry.

## Installation
To use the repo, please clone the repository by executing the following command:

``` git
git clone https://github.com/Dcohen52/JsonToPython
```

This will create a local copy of the project, allowing you to utilize its features and functionalities.

## Usage
Here's a basic example of how to use the `JsonToPython` class:

``` python
import json
from json_to_python import JsonToPython
```

# Transpile JSON structure to Python code
``` python
transpiler = JsonToPython(json_structure)
python_code = transpiler.transpile()

print(python_code)
```

## Example
``` json
[
  {
    "function": "main",
    "params": [],
    "body": [
      {
        "function_call": [
          "print",
          [
            "Hello, World!"
          ]
        ]
      }
    ]
  },
  {
    "if": {
      "condition": {
        "==": [
          "$__name__",
          "__main__"
        ]
      },
      "then": [
        {
          "function_call": [
            "main",
            []
          ]
        }
      ],
      "else": []
    }
  }
]

```
This JSON code is equivalent to the Python code:

``` python
def main():
    print("Hello, World!")


if __name__ == "__main__":
    main()
```


## Supported JSON elements
The `JsonToPython` class supports the following JSON elements:

* **Variables:** "var"
* **Functions:** "function"
* **If-else statements:** "if"
* **While loops:** "while"
* **For loops:** "for"
* **Return statements:** "return"
* **Print statements:** "print"
* **Input statements:** "input"
* **Expressions:** "expression"
---
# PythonToJSON class
This Python class enables the conversion of Python code into a JSON representation of its abstract syntax tree (AST).

## Usage
Instantiate the PythonToJson class with the Python code you wish to transpile:

```python
y = 5
def fibonacci(n):
    if (n <= 1):
        return n
    else:
        result = ((n - 1) + (n - 2))
        return result
```

transpiler = PythonToJson(python_code)
To transpile the Python code into JSON, invoke the transpile() method:

``` python
json_structure = transpiler.transpile()
```
The json_structure variable will contain the JSON representation of the AST derived from the Python code.

The output will look like this:
``` json
[
  {
    "var": "y",
    "value": 5
  },
  {
    "function": "fibonacci",
    "params": [
      "n"
    ],
    "body": [
      {
        "if": {
          "condition": {
            "<=": [
              "$n",
              1
            ]
          },
          "then": [
            {
              "return": "$n"
            }
          ],
          "else": [
            {
              "var": "result",
              "value": {
                "+": [
                  {
                    "-": [
                      "$n",
                      1
                    ]
                  },
                  {
                    "-": [
                      "$n",
                      2
                    ]
                  }
                ]
              }
            },
            {
              "return": "$result"
            }
          ]
        }
      }
    ]
  }
]
```

## Structure of JSON Output
The resulting JSON structure mirrors the AST of the Python code. Each node in the AST corresponds to a specific JSON object.

The JSON structure encompasses the following node types:

* **Function Definition:** Represents a function definition in Python.
  * "function": Function name.
  * "params": List of function parameters.
  * "body": List of statements within the function body.
* **Class Definition:** Represents a class definition in Python.
  * "class": Class name.
  * "body": List of statements within the class body.
* **Assignment:** Represents a variable assignment in Python.
  * "var": Variable name.
  * "value": Assigned value.
* **Expression:** Represents an expression in Python.
  * "function_call": Function call expression.
    * Tuple containing the function name and a list of arguments.
  * Binary operation expressions (+, -, *, /, <, >, <=, >=, ==, !=).
    * Operator as the key and a list of left and right operands.
  * Comparison expressions (<, >, <=, >=, ==, !=).
    * Operator as the key and a list of left and right operands.
  * Boolean operations (and, or).
    * Operator as the key and a list of values.
* **If Statement:** Represents an if statement in Python.
  * "if": If statement condition, then block, and else block.
  * "condition": If statement condition expression.
  * "then": List of statements within the if block.
  * "else": List of statements within the else block.
* **While Loop:** Represents a while loop in Python.
  * "while": While loop condition and body.
  * "condition": While loop condition expression.
  * "body": List of statements within the loop.
* **For Loop:** Represents a for loop in Python.
  * "for": For loop variable, iterable, and body.
  * "var": Loop variable.
  * "iterable": Iterable expression.
  * "body": List of statements within the loop.
* **Return Statement:** Represents a return statement in Python.
  * "return": Return value expression.
* **List Comprehension:** Represents a list comprehension in Python.
  * "list_comp": List comprehension target, iterable, and optional if condition.
  * "target": Target expression.
  * "iter": Iterable expression.
  * "if": Optional if condition expression.
---


# Changelog
The changelog provides an overview of notable updates and improvements made to the PJHarpy library throughout its development. Users can refer to this section to stay informed about new features, bug fixes, and performance enhancements.

## [Unreleased - Version 0.0.3-dev] - 04.05.2023
### Added - JSON to Python class
* Basic functionality for converting Python code into a JSON representation of its abstract syntax tree (AST).
* Support for various Python constructs, including variables, functions, if-else statements, while and for loops, return statements, and list comprehensions.

### Changed - Python to JSON class
* Bug fixes.
* Enhanced performance.

## [Unreleased - Version 0.0.2-dev] - 02.05.2023
### Changed
* Bug fixes: Enhanced expression and function processing to ensure the export of a more precise representation of the code.

## [Unreleased - Version 0.0.1-dev] - 29.04.2023
### Added
* Basic functionality for converting JSON structure-code into Python code
* Support for various Python constructs (variables, functions, if-else statements, while and for loops, return statements, print statements, and input statements)
* Support for `if __name__ == "main":`

# Contributing
Contributions are welcome! If you have a feature request or found a bug, please open an issue on the project's GitHub repository. For major changes, please open an issue first to discuss what you would like to change.

# License
The project released under the MIT License. See the LICENSE file for more information.
