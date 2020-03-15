# geoplanet

[![Source Code](https://img.shields.io/badge/Source%20Code-black?logo=github)](https://github.com/Prouser123/geoplanet)
[![npm](https://img.shields.io/npm/v/geoplanet)
![node](https://img.shields.io/node/v/geoplanet)](https://www.npmjs.com/package/geoplanet)
[![Travis (.com)](https://img.shields.io/travis/com/prouser123/geoplanet)](https://travis-ci.com/Prouser123/geoplanet)
[![Codecov](https://img.shields.io/codecov/c/gh/prouser123/geoplanet)](https://codecov.io/gh/prouser123/geoplanet)

Parse Yahoo GeoPlanet data in NodeJS.

## Installation

`npm i geoplanet`

### Do I need the data?

The data is downloaded automatically during installation.

Just `npm install` and go!

## API

```js
const geoplanet = require("geoplanet");

// Find any place with 'London' in the name in the UK.
await geoplanet({ name: "London", countryCode: "GB" });

// Find any place with the **exact** name of "London" in the UK.
await geoplanet({ name: "London", countryCode: "GB" }, true);
```

## Legal

See `LICENSE` for full details.

#### Program Code

Copyright © 2019-20 James Cahill

`Public Domain (Unlicense)`

#### Yahoo! GeoPlanet™ Database

Copyright © 2009 Yahoo! Inc. Some rights reserved.

Licensed under `CC-3.0-US` - **All uses allowed when attributed.**
