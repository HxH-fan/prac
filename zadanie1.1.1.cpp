#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    vector<int> A = {5, -3, 10, -2, 8, -7, 1};

    int min_idx = min_element(A.begin(), A.end()) - A.begin();
    int max_idx = max_element(A.begin(), A.end()) - A.begin();

    int start = min(min_idx, max_idx) + 1;
    int end = max(min_idx, max_idx);

    int neg_sum = 0;
    int sum = 0;
    int count = 0;

    for (int i = start; i < end; ++i) {
        if (A[i] < 0)
            neg_sum += A[i];
        sum += A[i];
        count++;
    }

    double average = (count > 0) ? static_cast<double>(sum) / count : 0;

    cout << "Сумма отрицательных: " << neg_sum << endl;
    cout << "Среднее арифметическое: " << average << endl;

    return 0;
}
