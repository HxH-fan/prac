A = [5, -3, 10, -2, 8, -7, 1]

min_idx = A.index(min(A))
max_idx = A.index(max(A))

start = min(min_idx, max_idx) + 1
end = max(min_idx, max_idx)

neg_sum = 0
total = 0
count = 0

for i in range(start, end):
    if A[i] < 0:
        neg_sum += A[i]
    total += A[i]
    count += 1

average = total / count if count > 0 else 0

print("Сумма отрицательных:", neg_sum)
print("Среднее арифметическое:", average)
