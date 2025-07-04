class ArrayAnalyzer:
    def __init__(self, data):
        self.data = data

    def analyze(self):
        min_idx = self.data.index(min(self.data))
        max_idx = self.data.index(max(self.data))

        start = min(min_idx, max_idx) + 1
        end = max(min_idx, max_idx)

        sub = self.data[start:end]

        neg_sum = sum(x for x in sub if x < 0)
        average = sum(sub) / len(sub) if sub else 0

        return neg_sum, average
