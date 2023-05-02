# JsonToPython
`JsonToPython` (offer a better name) is a Python class designed to facilitate the seamless conversion of JSON structure-code into Python code. This library accommodates a diverse range of Python constructs, including variables, functions, if-else statements, while and for loops, return statements, print statements, and input statements, among others. By leveraging the versatility of `JsonToPython`, developers can harness their creativity to efficiently compose code using JSON files.

The driving force behind this project was to create a programming language that closely mirrors JSON, offering a fresh and innovative approach to web development, which caters to the evolving demands of the industry.

## Installation
To install the package, please clone the repository by executing the following command:

``` git
git clone https://github.com/Dcohen52/JsonToPython
```

This will create a local copy of the project, allowing you to utilize its features and functionalities.

## Usage
Here's a basic example of how to use the `JsonToPython` class:

``` python
import json
from <> import JsonToPython
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
    "var": "x",
    "value": 10
  },
  {
    "function": "factorial",
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
              "return": 1
            }
          ],
          "else": [
            {
              "var": "result",
              "value": "n * (n - 1)"

            },
            {
              "return": "result"
            }
          ]
        }
      }
    ]
  },
  {
    "__name__": "main",
    "body": [
      {
        "var": "y",
        "value": {
          "function_call": [
            "factorial",
            [
              10
            ]
          ],
          "comment": "this is a comment"
        }
      },
      {
        "print": "y"
      }
    ]
  }
]

```
This JSON code is equivalent to the Python code:

``` python
x = 10
def factorial(n):
    if n <= 1:
        return 1
    else:
        result = n * (n - 1)
        return result
    
if __name__ == '__main__':
    y = factorial(10)
    print(y)
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

# Changelog
The changelog provides an overview of notable updates and improvements made to the `JsonToPython` library throughout its development. Users can refer to this section to stay informed about new features, bug fixes, and performance enhancements.

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
`JsonToPython` is released under the MIT License. See the LICENSE file for more information.
