import ast
import json


class PythonToJson:
    def __init__(self, python_code):
        self.python_code = python_code

    def transpile(self):
        parsed_ast = ast.parse(self.python_code)
        json_structure = [self.process_node(node) for node in parsed_ast.body]
        return json.dumps(json_structure, indent=2)

    def process_node(self, node):
        if isinstance(node, ast.FunctionDef):
            return self.process_function_def(node)
        elif isinstance(node, ast.Assign):
            return self.process_assign(node)
        elif isinstance(node, ast.Expr):
            return self.process_expr(node)
        elif isinstance(node, ast.If):
            return self.process_if(node)
        elif isinstance(node, ast.While):
            return self.process_while(node)
        elif isinstance(node, ast.For):
            return self.process_for(node)
        elif isinstance(node, ast.Return):
            return self.process_return(node)
        elif isinstance(node, ast.ListComp):
            return self.process_list_comp(node)
        elif isinstance(node, ast.ClassDef):
            return self.process_class_def(node)
        else:
            raise ValueError(f"Unsupported node type: {type(node)}")

    def process_assign(self, node):
        var = node.targets[0].id
        value = self.process_expr_value(node.value)
        return {"var": var, "value": value}

    def process_list_comp(self, node):
        target = self.process_expr_value(node.target)
        iter = self.process_expr_value(node.iter)
        if len(node.ifs) > 0:
            if_expr = self.process_expr_value(node.ifs[0])
            return {"list_comp": {"target": target, "iter": iter, "if": if_expr}}
        else:
            return {"list_comp": {"target": target, "iter": iter}}

    def process_function_def(self, node):
        func_name = node.name
        args = self.process_arguments(node.args.args, node.args.defaults)
        body = [self.process_node(stmt) for stmt in node.body]

        return {"function": func_name, "params": args, "body": body}

    def process_class_def(self, node):
        class_name = node.name
        body = [self.process_node(stmt) for stmt in node.body]

        return {"class": class_name, "body": body}

    def process_if(self, node):
        condition = self.process_expr_value(node.test)
        then_block = [self.process_node(stmt) for stmt in node.body]
        else_block = [self.process_node(stmt) for stmt in node.orelse]
        return {"if": {"condition": condition, "then": then_block, "else": else_block}}

    def process_while(self, node):
        condition = self.process_expr_value(node.test)
        body = [self.process_node(stmt) for stmt in node.body]
        return {"while": {"condition": condition, "body": body}}

    def process_for(self, node):
        var = node.target.id
        iterable = self.process_expr_value(node.iter)
        body = [self.process_node(stmt) for stmt in node.body]
        return {"for": {"var": var, "iterable": iterable, "body": body}}

    def process_return(self, node):
        return {"return": self.process_expr_value(node.value)}

    def process_expr(self, node):
        return self.process_expr_value(node.value)

    def process_expr_value(self, value):
        if isinstance(value, ast.Constant):
            return value.value
        elif isinstance(value, ast.Name):
            return f"${value.id}"
        elif isinstance(value, ast.Call):
            return {"function_call": (value.func.id, [self.process_expr_value(arg) for arg in value.args])}
        elif isinstance(value, ast.BinOp):
            left = self.process_expr_value(value.left)
            right = self.process_expr_value(value.right)
            op = self.process_operator(value.op)
            return {op: [left, right]}
        elif isinstance(value, ast.Compare):
            left = self.process_expr_value(value.left)
            right = self.process_expr_value(value.comparators[0])
            op = self.process_operator(value.ops[0])
            return {op: [left, right]}
        elif isinstance(value, ast.BoolOp):
            op = self.process_operator(value.op)
            values = [self.process_expr_value(val) for val in value.values]
            return {op: values}
        else:
            raise ValueError(f"Unsupported expression value type: {type(value)}")

    def process_arguments(self, args, defaults):
        arg_names = [arg.arg for arg in args]
        default_values = [None] * (len(args) - len(defaults)) + [self.process_expr_value(default) for default in
                                                                 defaults]

        processed_args = []
        for arg_name, default_value in zip(arg_names, default_values):
            if default_value is None:
                processed_args.append(arg_name)
            else:
                processed_args.append({"var": arg_name, "default": default_value})

        return processed_args

    def process_operator(self, op):
        if isinstance(op, ast.Add):
            return "+"
        elif isinstance(op, ast.Sub):
            return "-"
        elif isinstance(op, ast.Mult):
            return "*"
        elif isinstance(op, ast.Div):
            return "/"
        elif isinstance(op, ast.Lt):
            return "<"
        elif isinstance(op, ast.Gt):
            return ">"
        elif isinstance(op, ast.LtE):
            return "<="
        elif isinstance(op, ast.GtE):
            return ">="
        elif isinstance(op, ast.Eq):
            return "=="
        elif isinstance(op, ast.NotEq):
            return "!="
        else:
            raise ValueError(f"Unsupported operator type: {type(op)}")


# Example usage:
python_code = """
y = 5
def fibonacci(n):
    if (n <= 1):
        return n
    else:
        result = ((n - 1) + (n - 2))
        return result
"""

transpiler = PythonToJson(python_code)
json_structure = transpiler.transpile()
print(json_structure)
