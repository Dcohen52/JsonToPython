import json
import re


class JsonToPython:
    def __init__(self, json_structure):
        self.json_structure = json_structure

    def transpile(self):
        return "\n".join(self.process_element(element) for element in self.json_structure)

    def process_element(self, element):
        if "var" in element:
            return self.process_var(element)
        elif "function" in element:
            return self.process_function(element)
        elif "if" in element:
            return self.process_if(element)
        elif "while" in element:
            return self.process_while(element)
        elif "for" in element:
            return self.process_for(element)
        elif "return" in element:
            return self.process_return(element)
        elif "print" in element:
            return self.process_print(element)
        elif "expression" in element:
            return self.process_expression(element["expression"])
        elif "input" in element:
            return self.process_input(element)
        # elif "__name__" in element:
        #     return self.process_name_main(element)
        elif "function_call" in element:
            return self.process_function_call(element)
        else:
            raise ValueError("Invalid element: {}".format(element))

    def process_var(self, element):
        var = element["var"]
        value = element["value"]
        if isinstance(value, dict):
            return f'{var} = {self.process_expression(value)}'
        else:
            return f'{var} = {value}'

    def process_function(self, element):
        function_name = element["function"]
        params = ", ".join(element["params"])
        body = "\n".join(self.process_element(stmt) for stmt in element["body"])
        if function_name == "factorial":
            last_statement = element["body"][-1]
            return_statement = 'return {}'.format(
                self.process_expression(last_statement["return"])) if "return" in last_statement else ""
            return 'def {func_name}({func_params}):\n    {func_body}\n    {return_stmt}'.format(
                func_name=function_name, func_params=params, func_body=body.replace("\n", "\n    "),
                return_stmt=return_statement
            )
        elif function_name == "main":
            return 'def {func_name}({func_params}):\n    {func_body}\n\n'.format(
                func_name=function_name, func_params=params, func_body=body.replace("\n", "\n    ")
            )
        elif function_name == "print":
            return 'def {func_name}({func_params}):\n    {func_body}'.format(
                func_name=function_name, func_params=params, func_body=body.replace("\n", "\n    ")
            )
        else:
            return 'def {func_name}({func_params}):\n    {func_body}'.format(
                func_name=function_name, func_params=params, func_body=body.replace("\n", "\n    ")
            )

    def process_function_call(self, element):
        func_name, func_args = element["function_call"]
        if func_args == []:
            return f'{func_name}()'
        else:
            args = ', '.join(self.process_expression(arg) for arg in func_args)
            return f'{func_name}({args})'

    def process_if(self, element):
        condition = self.process_expression(element["if"]["condition"])
        then_block = "\n".join(self.process_element(stmt) for stmt in element["if"]["then"])
        else_block = "\n".join(self.process_element(stmt) for stmt in element["if"]["else"])

        if else_block == "":
            if "__name__" and "__main__" in element["if"]["condition"]:
                return ""
            return 'if {}:\n    {}'.format(condition, then_block.replace("\n", "\n    "))
        elif then_block == "":
            return 'if not {}:\n    {}'.format(condition, else_block.replace("\n", "\n    "))

        return 'if {}:\n    {}\nelse:\n    {}'.format(condition.strip("()"), then_block.replace("\n", "\n    "),
                                                      else_block.replace("\n", "\n    "))

    def process_while(self, element):
        condition = self.process_expression(element["while"]["condition"])
        body = "\n".join(self.process_element(stmt) for stmt in element["while"]["body"])
        if body == "":
            return 'while {}:\n    pass'.format(condition)
        return 'while {}:\n    {}'.format(condition, body.replace("\n", "\n    "))

    def process_for(self, element):
        var = element["for"]["var"]
        iterable = element["for"]["iterable"]
        body = "\n".join(self.process_element(stmt) for stmt in element["for"]["body"])
        return 'for {} in {}:\n    {}'.format(var, iterable, body.replace("\n", "\n    "))

    def process_return(self, element):
        if "$" in element["return"]:
            return f'return {self.process_expression(element["return"])}'
        return f'return {element["return"]}'

    def process_input(self, element):
        return f'input {element["input"]}'

    def process_expression(self, expression):
        if isinstance(expression, dict):
            if "function_call" in expression:
                func_name, func_args = expression["function_call"]
                if func_args == []:
                    return f'{func_name}{func_args}'
                else:
                    return f'{func_name}({", ".join(self.process_expression(arg) for arg in func_args)})'
            else:
                op, args = next(iter(expression.items()))
                if op in ["+", "-", "*", "/", "<", ">", "<=", ">=", "==", "!="]:
                    left, right = args
                    if "__name__" in left and "__main__" in right:
                        return '{} {} {}'.format(self.process_expression(left), op, self.process_expression(right))
                    return '{} {} {}'.format(self.process_expression(left), op, self.process_expression(right))
                elif op == "+=":
                    var, value = args
                    return '{} += {}'.format(self.process_variable(var), self.process_expression(value))
                # elif op == "print":
                #     return 'print({})'.format(", ".join(self.process_expression(arg) for arg in args))
                elif op == "input":
                    return 'input({})'.format(self.process_expression(args))
                elif op == "[]":
                    var, index = args
                    return '{}[{}]'.format(self.process_variable(var), self.process_expression(index))
                elif op == "[]=":
                    var, index, value = args
                    return '{}[{}] = {}'.format(self.process_variable(var), self.process_expression(index),
                                                self.process_expression(value))
                elif op == "if":
                    return self.process_if(args)
                elif op == "while":
                    return self.process_while(args)
                elif op == "for":
                    return self.process_for(args)
                elif op == "return":
                    return self.process_return(args)
                elif op == "input":
                    return self.process_input(args)
                elif op == "var":
                    return self.process_variable(args)
        elif isinstance(expression, list):
            if len(expression) == 1:
                return self.process_expression(expression[0])
            elif len(expression) == 2:
                function, arg = expression
                if function in ["int", "float", "str"]:
                    return '{}({})'.format(function, self.process_expression(arg))
                else:
                    return '{}({})'.format(function, self.process_expression(arg))
            elif len(expression) == 3:
                op, left, right = expression
                return '({} {} {})'.format(self.process_expression(left), op, self.process_expression(right))

            else:
                raise ValueError("Invalid expression: {}".format(expression))
        elif isinstance(expression, str):
            if expression.startswith('"') and expression.endswith('"'):
                return expression
            elif expression.startswith("'") and expression.endswith("'"):
                return expression
            elif expression.startswith("$"):
                return self.process_variable(expression)
            else:
                return f'"{expression}"'
        else:
            return str(expression)

    def process_variable(self, variable):
        if isinstance(variable, str) and variable.startswith("$"):
            return variable[1:]
        else:
            raise ValueError("Invalid variable: {}".format(variable))

    def process_print(self, element):
        if isinstance(element["print"], str):
            return 'print({})'.format(element["print"])
        elif isinstance(element["print"], list):
            return 'print({})'.format(", ".join(self.process_expression(arg) for arg in element["print"]))
        elif isinstance(element["print"], dict):
            return 'print({})'.format(self.process_expression(element["print"]))
        elif isinstance(element["print"], tuple):
            return 'print({})'.format(", ".join(self.process_expression(arg) for arg in element["print"]))
        elif isinstance(element["print"], set):
            return 'print({})'.format(", ".join(self.process_expression(arg) for arg in element["print"]))
        else:
            return 'print({})'.format(", ".join(self.process_expression(arg) for arg in element["print"]))

    # def process_name_main(self, element):
    #     main_value = element["__name__"]
    #     body = "\n".join(self.process_element(stmt) for stmt in element["body"])
    #     if function_call := re.match(r"(.*)\((.*)\)", main_value):
    #         return "{}({})".format(function_call.group(1), function_call.group(2))
    #     elif main_value == "__main__":
    #         return 'if __name__ == "__main__":\n    {}'.format(body.replace("\n", "\n    "))
    #     else:
    #         return ''
