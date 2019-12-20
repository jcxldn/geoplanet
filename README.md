# geoplanet

![npm](https://img.shields.io/npm/v/geoplanet)
![node](https://img.shields.io/node/v/geoplanet)
![Travis (.com)](https://img.shields.io/travis/com/prouser123/geoplanet)
![Codecov](https://img.shields.io/codecov/c/gh/prouser123/geoplanet)

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

Copyright © 2019 James Cahill

`Public Domain (Unlicense)`

#### Yahoo! GeoPlanet™ Database

Copyright © 2009 Yahoo! Inc. Some rights reserved.

Licensed under `CC-3.0-US` - **All uses allowed when attributed.**
