# MMM-Simpsons
A module for MagicMirror<sup>2</sup> that displays the a random Simpsons quote. Uses https://thesimpsonsquoteapi.glitch.me

<img src="simpsons.png"></img>

## Dependencies
  * A [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) installation

## Installation
  1. Clone this repo into your `modules` directory.
  2. Create an entry in your `config.js` file to tell this module where to display on screen.
  
  
 **Example:**
```
 {
    module: 'MMM-Simpsons',
	position: 'bottom_bar',
	config: {
		updateInterval : 36000000
	}
 },
```

## Config
| **Option** | **Description** |
| --- | --- |
| `updateInterval` | Set to desired update interval (in ms), default is `3600000` (10 hours). |

Heavily inspired by the awesome MagicMirror plugin [DailyDilbert].
I barely added anything here except call the different rest api, 
so full credit to DailyDilbert module.
