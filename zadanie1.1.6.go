package main

import "fmt"

type ArrayAnalyzer struct {
    Data []int
}

func (a ArrayAnalyzer) Analyze() (int, float64) {
    if len(a.Data) == 0 {
        return 0, 0.0
    }

    minIdx, maxIdx := 0, 0
    for i := 1; i < len(a.Data); i++ {
        if a.Data[i] < a.Data[minIdx] {
            minIdx = i
        }
        if a.Data[i] > a.Data[maxIdx] {
            maxIdx = i
        }
    }

    start := min(minIdx, maxIdx) + 1
    end := max(minIdx, maxIdx)

    negSum := 0
    total := 0
    count := 0

    for i := start; i < end; i++ {
        if a.Data[i] < 0 {
            negSum += a.Data[i]
        }
        total += a.Data[i]
        count++
    }

    avg := 0.0
    if count > 0 {
        avg = float64(total) / float64(count)
    }

    return negSum, avg
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
