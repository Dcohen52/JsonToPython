y = 5
def fibonacci(n):
    if n <= 1:
        return n
    else:
        result = (n - 1) + (n - 2)
        return result