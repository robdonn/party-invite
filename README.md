# Party Invite

> Write a program that will read the full list of customers and output the names and user ids of matching customers (within 100km), sorted by User ID (ascending).

## Requirements

- Node >= 9.6 (You can use `nvm use` to automatically install)

## Instructions

- `(yarn | npm) install`
- `(yarn | npm) start`

## Method

```math
a = sin²(Δφ/2) + cos φ1 * cos φ2 * sin²(Δλ/2)
c = 2 * atan2( √a, √(1−a) )
d = R * c
```

- [Great-circle distance](https://en.wikipedia.org/wiki/Great-circle_distance)
- [Haversine formula](https://en.wikipedia.org/wiki/Great-circle_distance)

## Coverage

| File                 | % Statements | % Branch | % Funcs | % Lines |
| -------------------- | ------------ | -------- | ------- | ------- |
| All files            | 100          | 100      | 100     | 100     |
| calculateDistance.js | 100          | 100      | 100     | 100     |
| handleError.js       | 100          | 100      | 100     | 100     |
| readSourceFile.js    | 100          | 100      | 100     | 100     |
| run.js               | 100          | 100      | 100     | 100     |

## Output

| user_id | name              |
| ------- | ----------------- |
| 4       | Ian Kehoe         |
| 5       | Nora Dempsey      |
| 6       | Theresa Enright   |
| 8       | Eoin Ahearn       |
| 11      | Richard Finnegan  |
| 12      | Christina McArdle |
| 13      | Olive Ahearn      |
| 15      | Michael Ahearn    |
| 17      | Patricia Cahill   |
| 23      | Eoin Gallagher    |
| 24      | Rose Enright      |
| 26      | Stephen McArdle   |
| 29      | Oliver Ahearn     |
| 30      | Nick Enright      |
| 31      | Alan Behan        |
| 39      | Lisa Ahearn       |
