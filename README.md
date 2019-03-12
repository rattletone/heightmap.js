# Heightmap.js

[![npm](https://img.shields.io/npm/v/heightmap.js.svg)](https://www.npmjs.com/package/heightmap.js)
[![Build Status](https://travis-ci.com/rattletone/heightmap.js.svg?token=8zp6iGNjVALRr5imsLKd&branch=master)](https://travis-ci.com/rattletone/heightmap.js)
[![Coverage Status](https://coveralls.io/repos/github/rattletone/heightmap.js/badge.svg?branch=master)](https://coveralls.io/github/rattletone/heightmap.js?branch=master)

Library for procedurally generating heightmaps.

## Installation

### Browser

```html
<script src="heightmap.js"></script>
```

### Node

```sh
npm i heightmap.js
```

## Usage

The globally exported `Heightmap` class contains the static `create` method. This generates a heightmap represented as a square array of numbers between 0 and 1 with size 2 ^ n + 1.

The method uses the Diamond-Square Algorithm. An `iterations` argument is required to set the amount of iterations of the algorithm, which corresponds to n in the size formula.

For example, `Heightmap.create(2)` will create a heightmap of size 5.
