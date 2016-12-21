# react-circular-legend

[![Dependency Status](https://gemnasium.com/badges/github.com/ganezasan/react-circular-legend.svg)](https://gemnasium.com/github.com/ganezasan/react-circular-legend)

[![npm](https://img.shields.io/npm/v/react-circular-legend.svg)](https://npmjs.com/package/react-circular-legend)

[![GitHub license](https://img.shields.io/github/license/ganezasan/react-circular-legend.svg)](https://github.com/ganezasan/react-circular-legend)

A circular legned component, using d3.js

![example movie](https://raw.githubusercontent.com/ganezasan/react-circular-legend/master/react-circular-legend.gif)


## Installation

```
npm install react-circular-legend
```

## Demo

[https://takayuki-ito.me/react-circular-legend/](http://ganezasan.github.io/react-circular-legend/)

## props

- ticks: (required) Array of numbers, see example above
- domainMax: Number, default maximum number in ticks
- domainMin: Number, default is 0
- rangeMax: Number, default is 50, it's circle radius max.
- rangeMin: Number, default is 0
- tickExtend: Number, default is 5
- textMargin: Number, default is 5
- fontSize: Number, default is 12, it's px size.
- innerSvg: Boolean, if you want to add this legned in your svg, you should set `true`.

## Example

```
import React from 'react';
import { CircularLegend } from 'react-circular-legend';

function Example() {
  return (
    <CircularLegend
      ticks={[0, 2500, 5000, 10000]}
    />
  );  
}

export default Example;
```

## License
MIT
