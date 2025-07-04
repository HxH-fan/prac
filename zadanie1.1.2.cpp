#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>

using namespace std;

class ArrayAnalyzer {
private:
    vector<int> data;

public:
    ArrayAnalyzer(const vector<int>& arr) : data(arr) {}

    pair<int, double> analyze() {
        int min_idx = min_element(data.begin(), data.end()) - data.begin();
        int max_idx = max_element(data.begin(), data.end()) - data.begin();

        int start = min(min_idx, max_idx) + 1;
        int end = max(min_idx, max_idx);

        int neg_sum = 0;
        int sum = 0;
        int count = 0;

        for (int i = start; i < end; ++i) {
            if (data[i] < 0)
                neg_sum += data[i];
            sum += data[i];
            count++;
        }

        double average = (count > 0) ? static_cast<double>(sum) / count : 0;
        return make_pair(neg_sum, average);
    }
};
