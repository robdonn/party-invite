[![CircleCI](https://circleci.com/gh/robdonn/party-invite.svg?style=svg)](https://circleci.com/gh/robdonn/party-invite)
[![codecov](https://codecov.io/gh/robdonn/party-invite/branch/master/graph/badge.svg)](https://codecov.io/gh/robdonn/party-invite)

# Party Invite

A Node base CLI

> Write a program that will read the full list of customers and output the names and user ids of matching customers (within 100km), sorted by User ID (ascending).

## Requirements

- Node >= 9.6 (You can use `nvm use` to automatically install)

## Instructions

- `(yarn | npm) install`

## Try it out

### Local

- `(yarn | npm) start`

### Global

- `(yarn | npm) link`

This will make the `party-invite` script globally available on your machine via symlink. Now from anywhere on your machine you can run command. e.g.

- `party-invite`
- `party-invite --source=./customers.txt`

## Options

### `--source`

Select a source file for the customer data.
**Default:** `./customers.txt`

### `--lat`

Define central latitude for comparing distances
**Default:** `53.339428`

### `--lon`

Define central longitude for comparing distances
**Default:** `-6.257664`

### `--distance`

Distance in km to allow invites
**Default:** `100`

## Method

```math
a = sin²(Δφ/2) + cos φ1 * cos φ2 * sin²(Δλ/2)
c = 2 * atan2( √a, √(1−a) )
d = R * c
```

- [Great-circle distance](https://en.wikipedia.org/wiki/Great-circle_distance)
- [Haversine formula](https://www.movable-type.co.uk/scripts/latlong.html)

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
