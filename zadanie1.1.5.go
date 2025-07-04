package main

import "fmt"

func main() {
    A := []int{5, -3, 10, -2, 8, -7, 1}

    minIdx, maxIdx := 0, 0
    for i := 1; i < len(A); i++ {
        if A[i] < A[minIdx] {
            minIdx = i
        }
        if A[i] > A[maxIdx] {
            maxIdx = i
        }
    }

    start := min(minIdx, maxIdx) + 1
    end := max(minIdx, maxIdx)

    negSum, total, count := 0, 0, 0

    for i := start; i < end; i++ {
        if A[i] < 0 {
            negSum += A[i]
        }
        total += A[i]
        count++
    }

    avg := 0.0
    if count > 0 {
        avg = float64(total) / float64(count)
    }

    fmt.Println("Сумма отрицательных:", negSum)
    fmt.Printf("Среднее арифметическое: %.2f\n", avg)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
