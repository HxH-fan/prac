for i in range(1, 101):
    style = ""
    if i % 3 == 0:
        style += "\033[1m"  # жирный
    if i % 2 == 0:
        style += "\033[3m"  # курсив
    reset = "\033[0m"
    print(f"{style}{i}{reset}", end=' ')
